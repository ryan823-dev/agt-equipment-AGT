# AGT Equipment SEO/AEO 优化计划

## 专家报告验证结果

### ❌ 专家误判（我们已实现的）

| 专家声称 | 实际状态 | 代码位置 |
|---------|---------|---------|
| Meta Description 缺失 | ✅ 已存在 | `layout.tsx:20` |
| Canonical 标签缺失 | ✅ 已存在 | `layout.tsx:66-68` |
| Open Graph 标签缺失 | ✅ 已存在 | `layout.tsx:30-45` |
| Twitter Card 标签缺失 | ✅ 已存在 | `layout.tsx:46-51` |
| Robots Meta 缺失 | ✅ 已存在 | `layout.tsx:52-62` |
| 产品页缺少 Product Schema | ✅ 已存在 | `[product]/page.tsx:62-74` |
| FAQ 缺少 FAQPage Schema | ✅ 已存在 | `[product]/page.tsx:75-82` |
| 缺少 BreadcrumbList Schema | ✅ 已存在 | `[product]/page.tsx:62-68` |

**结论**：专家使用的工具无法正确解析 Next.js Metadata API，导致大量误判。

### ✅ 已修复问题

| 问题 | 优先级 | 状态 |
|-----|-------|------|
| PWA icon 404 (icon-192.png, icon-512.png) | P1 | ✅ 已修复 |
| 首页缺少 Organization + WebSite Schema | P1 | ✅ 已修复 |
| 分类页缺少 CollectionPage Schema | P2 | ✅ 已存在 |
| 知识库文章缺少 Article Schema | P2 | ✅ 已存在 |
| Solutions 页面缺少 Article Schema | P2 | ✅ 已添加 |
| Compare 页面缺少 Article Schema | P2 | ✅ 已添加 |
| 产品页 Title 冗余 | P1 | ✅ 已修复 |

### ⚠️ 不采纳的建议

| 建议 | 原因 |
|-----|------|
| 缩短产品 URL 层级 | 3层结构有利于 SEO 分类，不修改 |
| 修改 sitemap 域名 | agt-equipment.com 是正式域名，Vercel 是预览环境 |
| 添加 hreflang | 无多语言需求 |

---

## 已完成的优化

### Phase 1: 基础修复 (P1) ✅

#### 1.1 修复 PWA Icon
- [x] 创建 icon-192.png
- [x] 创建 icon-512.png
- [x] 创建 apple-touch-icon.png
- [x] 创建 favicon.ico

#### 1.2 首页添加结构化数据
- [x] 添加 Organization Schema (公司信息、地址、联系方式)
- [x] 添加 WebSite Schema (站内搜索 SearchAction)
- [x] 首页 FAQ 添加 FAQPage Schema

#### 1.3 修复产品页 Title
- [x] 移除所有页面的 "| AGT Equipment" 冗余后缀
- [x] 涉及 15+ 页面

### Phase 2: 结构化数据完善 (P2) ✅

#### 2.1 分类页 Schema
- [x] 已存在 ItemList Schema (产品列表)
- [x] 已存在 BreadcrumbList Schema
- [x] 已存在 FAQPage Schema

#### 2.2 知识库页面 Schema
- [x] 已存在 Article Schema
- [x] 已存在 datePublished, dateModified
- [x] 已存在 author 信息
- [x] 已存在 speakable Schema

#### 2.3 Solutions 页面 Schema
- [x] 添加 Article Schema
- [x] 添加 speakable Schema
- [x] 已存在 FAQPage Schema

#### 2.4 Compare 页面 Schema
- [x] 添加 Article Schema
- [x] 已存在 FAQPage Schema

---

## 待完成优化

### Phase 3: AEO 专项优化 (P2-P3) ✅

#### 3.1 内容扩展
- [x] 扩展知识库文章数量 (10 → 15 篇)
- [x] 添加价格指南类文章 (Mini Excavator Prices 2026)
- [x] 添加参数问答类文章 (重量、挖掘深度)
- [x] 添加购买决策类文章 (租赁 vs 购买)
- [x] 添加应用场景类文章 (农场使用)

#### 3.2 E-E-A-T 信号
- [x] 知识库文章添加作者署名 (所有文章)
- [ ] About 页面强化公司资质
- [ ] 添加客户评价/案例 (如有)

#### 3.3 产品页增强
- [ ] 添加产品专属 FAQ
- [ ] 添加"相关产品"交叉链接
- [ ] 添加产品视频嵌入 (如有)

### Phase 4: 长期优化 (P3)

#### 4.1 内容策略
- [ ] 建立"问题-答案"导向的内容库
- [ ] 创建更多对比类页面
- [ ] 本地 SEO 优化 (CA/IL 仓库)

#### 4.2 技术优化
- [ ] 考虑将图片迁移到 Next/Image 组件
- [ ] 添加 WebP 格式图片
- [ ] 优化 TTFB (当前约 1.27s)

---

## 当前 Schema 覆盖情况

| 页面类型 | Organization | WebSite | Product | Article | FAQPage | BreadcrumbList | ItemList |
|---------|-------------|---------|---------|---------|---------|----------------|----------|
| 首页 | ✅ | ✅ | - | - | ✅ | - | - |
| 产品详情页 | ✅ | ✅ | ✅ | - | ✅ | ✅ | - |
| 分类页 (Tier 1) | ✅ | ✅ | - | - | ✅ | ✅ | ✅ |
| 子分类页 (Tier 2) | ✅ | ✅ | - | - | ✅ | ✅ | ✅ |
| 知识库文章 | ✅ | ✅ | - | ✅ | ✅ | ✅ | - |
| Solutions 页面 | ✅ | ✅ | - | ✅ | ✅ | ✅ | - |
| Compare 页面 | ✅ | ✅ | - | ✅ | ✅ | ✅ | - |

---

## 验收标准

- [x] Google Rich Results Test 通过
- [x] Schema.org 验证器无错误
- [x] PWA icon 正常显示
- [ ] Lighthouse SEO 评分 > 90 (待测试)
