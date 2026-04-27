-- AGT Equipment E-Commerce Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USER PROFILES (extends Supabase Auth)
-- ============================================
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT,
    company_name TEXT,
    customer_type TEXT DEFAULT 'b2c' CHECK (customer_type IN ('b2c', 'b2b')),
    google_id TEXT UNIQUE,
    avatar_url TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ADDRESSES
-- ============================================
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('billing', 'shipping')),
    is_default BOOLEAN DEFAULT FALSE,
    first_name TEXT,
    last_name TEXT,
    company TEXT,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT DEFAULT 'US',
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CART ITEMS
-- ============================================
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    session_id TEXT,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT cart_owner CHECK (user_id IS NOT NULL OR session_id IS NOT NULL)
);

CREATE UNIQUE INDEX idx_cart_user_product ON cart_items(user_id, product_id)
    WHERE user_id IS NOT NULL;
CREATE UNIQUE INDEX idx_cart_session_product ON cart_items(session_id, product_id)
    WHERE session_id IS NOT NULL;

-- ============================================
-- ORDERS
-- ============================================
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'confirmed', 'processing', 'shipped',
        'delivered', 'cancelled', 'refunded'
    )),

    -- Amounts
    subtotal DECIMAL(12,2) NOT NULL,
    shipping_cost DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL,
    currency TEXT DEFAULT 'USD',

    -- Shipping
    shipping_address JSONB NOT NULL,
    billing_address JSONB NOT NULL,
    shipping_method TEXT,
    tracking_number TEXT,
    shipped_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,

    -- Payment
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN (
        'pending', 'paid', 'failed', 'refunded'
    )),
    payment_method TEXT CHECK (payment_method IN ('stripe', 'paypal')),
    payment_id TEXT,
    paid_at TIMESTAMPTZ,

    -- Notes
    customer_notes TEXT,
    internal_notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORDER ITEMS
-- ============================================
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_sku TEXT,
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    subtotal DECIMAL(12,2) NOT NULL,
    specifications JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- QUOTES (B2B) - Must be created before inquiries due to foreign key
-- ============================================
CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_number TEXT UNIQUE NOT NULL,
    inquiry_id UUID,  -- Will add foreign key constraint after inquiries table
    user_id UUID REFERENCES user_profiles(id),

    status TEXT DEFAULT 'draft' CHECK (status IN (
        'draft', 'sent', 'accepted', 'rejected', 'expired'
    )),
    valid_until TIMESTAMPTZ,

    -- Amounts
    subtotal DECIMAL(12,2) NOT NULL,
    shipping_cost DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL,
    currency TEXT DEFAULT 'USD',

    -- Terms
    payment_terms TEXT,
    shipping_terms TEXT,
    warranty_terms TEXT DEFAULT '1 Year Manufacturer Warranty',
    notes TEXT,

    -- Approval
    created_by UUID,
    approved_by UUID,
    approved_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INQUIRIES (B2B Quote Requests)
-- ============================================
CREATE TABLE inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inquiry_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,

    -- Contact Info
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    company_name TEXT,

    -- Inquiry Type
    type TEXT NOT NULL CHECK (type IN ('single', 'bulk', 'custom')),
    status TEXT DEFAULT 'pending' CHECK (status IN (
        'pending', 'quoted', 'accepted', 'converted', 'expired'
    )),

    -- Requirements
    message TEXT,
    use_case TEXT,
    preferred_timeline TEXT,
    attachments JSONB,

    -- Related Quote
    quote_id UUID REFERENCES quotes(id),
    converted_order_id UUID REFERENCES orders(id),

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key from quotes to inquiries
ALTER TABLE quotes ADD CONSTRAINT fk_quotes_inquiry_id FOREIGN KEY (inquiry_id) REFERENCES inquiries(id);

-- ============================================
-- INQUIRY ITEMS
-- ============================================
CREATE TABLE inquiry_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inquiry_id UUID NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
    product_id TEXT,
    product_name TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- QUOTE ITEMS
-- ============================================
CREATE TABLE quote_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    product_id TEXT,
    product_name TEXT NOT NULL,
    product_sku TEXT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    discount_percent DECIMAL(5,2) DEFAULT 0,
    subtotal DECIMAL(12,2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- B2B ACCOUNTS
-- ============================================
CREATE TABLE b2b_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,

    -- Company Info
    company_name TEXT NOT NULL,
    business_type TEXT CHECK (business_type IN (
        'contractor', 'dealer', 'rental', 'other'
    )),
    tax_id TEXT,
    website TEXT,

    -- Account Status
    status TEXT DEFAULT 'pending' CHECK (status IN (
        'pending', 'approved', 'suspended'
    )),
    verified_at TIMESTAMPTZ,
    verified_by UUID,

    -- Credit
    credit_limit DECIMAL(12,2) DEFAULT 0,
    credit_used DECIMAL(12,2) DEFAULT 0,
    payment_terms TEXT CHECK (payment_terms IN ('net15', 'net30', 'net60')),

    -- Discount Tier
    discount_tier TEXT DEFAULT 'bronze' CHECK (discount_tier IN (
        'bronze', 'silver', 'gold', 'platinum'
    )),
    default_discount_percent DECIMAL(5,2) DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_inquiries_user ON inquiries(user_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_quotes_user ON quotes(user_id);
CREATE INDEX idx_b2b_user ON b2b_accounts(user_id);
CREATE INDEX idx_addresses_user ON addresses(user_id);

-- ============================================
-- UPDATED AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_addresses_updated_at
    BEFORE UPDATE ON addresses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_cart_items_updated_at
    BEFORE UPDATE ON cart_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_inquiries_updated_at
    BEFORE UPDATE ON inquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_quotes_updated_at
    BEFORE UPDATE ON quotes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_b2b_accounts_updated_at
    BEFORE UPDATE ON b2b_accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiry_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_accounts ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view own profile"
    ON user_profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Addresses Policies
CREATE POLICY "Users can manage own addresses"
    ON addresses FOR ALL
    USING (auth.uid() = user_id);

-- Cart Items Policies
CREATE POLICY "Users can manage own cart"
    ON cart_items FOR ALL
    USING (auth.uid() = user_id OR session_id IS NOT NULL);

-- Orders Policies
CREATE POLICY "Users can view own orders"
    ON orders FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
    ON orders FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Order Items Policies
CREATE POLICY "Users can view own order items"
    ON order_items FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
    ));

-- Inquiries Policies
CREATE POLICY "Users can manage own inquiries"
    ON inquiries FOR ALL
    USING (auth.uid() = user_id OR contact_email = auth.email());

-- Inquiry Items Policies
CREATE POLICY "Users can view own inquiry items"
    ON inquiry_items FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM inquiries WHERE inquiries.id = inquiry_items.inquiry_id
        AND (inquiries.user_id = auth.uid() OR inquiries.contact_email = auth.email())
    ));

-- Quotes Policies
CREATE POLICY "Users can view own quotes"
    ON quotes FOR SELECT
    USING (auth.uid() = user_id);

-- Quote Items Policies
CREATE POLICY "Users can view own quote items"
    ON quote_items FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM quotes WHERE quotes.id = quote_items.quote_id AND quotes.user_id = auth.uid()
    ));

-- B2B Accounts Policies
CREATE POLICY "Users can view own b2b account"
    ON b2b_accounts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own b2b account"
    ON b2b_accounts FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own b2b account"
    ON b2b_accounts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- ============================================
-- HANDLE NEW USER SIGNUP
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- ADMIN POLICIES (Service Role Required)
-- ============================================

-- Create admin role for RLS
-- Note: These policies allow admins to access all records
-- Admin check is done via is_admin field in user_profiles

-- Orders - Admin can manage all orders
CREATE POLICY "Admins can manage all orders"
    ON orders FOR ALL
    USING (EXISTS (
        SELECT 1 FROM user_profiles WHERE user_profiles.id = auth.uid() AND user_profiles.is_admin = TRUE
    ));

-- Order Items - Admin can manage all order items
CREATE POLICY "Admins can manage all order items"
    ON order_items FOR ALL
    USING (EXISTS (
        SELECT 1 FROM user_profiles WHERE user_profiles.id = auth.uid() AND user_profiles.is_admin = TRUE
    ));

-- Inquiries - Admin can manage all inquiries
CREATE POLICY "Admins can manage all inquiries"
    ON inquiries FOR ALL
    USING (EXISTS (
        SELECT 1 FROM user_profiles WHERE user_profiles.id = auth.uid() AND user_profiles.is_admin = TRUE
    ));

-- Inquiry Items - Admin can manage all inquiry items
CREATE POLICY "Admins can manage all inquiry items"
    ON inquiry_items FOR ALL
    USING (EXISTS (
        SELECT 1 FROM user_profiles WHERE user_profiles.id = auth.uid() AND user_profiles.is_admin = TRUE
    ));

-- Quotes - Admin can manage all quotes
CREATE POLICY "Admins can manage all quotes"
    ON quotes FOR ALL
    USING (EXISTS (
        SELECT 1 FROM user_profiles WHERE user_profiles.id = auth.uid() AND user_profiles.is_admin = TRUE
    ));

CREATE POLICY "Admins can insert quotes"
    ON quotes FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM user_profiles WHERE user_profiles.id = auth.uid() AND user_profiles.is_admin = TRUE
    ));

-- Quote Items - Admin can manage all quote items
CREATE POLICY "Admins can manage all quote items"
    ON quote_items FOR ALL
    USING (EXISTS (
        SELECT 1 FROM user_profiles WHERE user_profiles.id = auth.uid() AND user_profiles.is_admin = TRUE
    ));

CREATE POLICY "Admins can insert quote items"
    ON quote_items FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM user_profiles WHERE user_profiles.id = auth.uid() AND user_profiles.is_admin = TRUE
    ));

-- B2B Accounts - Admin can manage all b2b accounts
CREATE POLICY "Admins can manage all b2b accounts"
    ON b2b_accounts FOR ALL
    USING (EXISTS (
        SELECT 1 FROM user_profiles WHERE user_profiles.id = auth.uid() AND user_profiles.is_admin = TRUE
    ));

-- Users - Admin can view all user profiles
CREATE POLICY "Admins can view all profiles"
    ON user_profiles FOR SELECT
    USING (is_admin = TRUE OR auth.uid() = id);

-- ============================================
-- GRANT ADMIN ACCESS (Run with service role)
-- ============================================
-- These grants allow the service role to bypass RLS for admin operations
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
