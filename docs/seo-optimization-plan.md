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

### ✅ 专家正确判断（需要修复）

| 问题 | 优先级 | 状态 |
|-----|-------|------|
| PWA icon 404 (icon-192.png, icon-512.png) | P1 | 待修复 |
| 首页缺少 Organization + WebSite Schema | P1 | 待修复 |
| 分类页缺少 CollectionPage Schema | P2 | 待修复 |
| 知识库文章缺少 Article Schema | P2 | 待修复 |
| Solutions 页面缺少 Schema | P2 | 待修复 |

### ⚠️ 需要澄清的问题

| 问题 | 分析 |
|-----|------|
| Sitemap/Robots 指向 agt-equipment.com | 这是正式域名，Vercel 是预览环境，**不是问题** |
| 产品 URL 层级过深 (3层) | 有意设计，利于 SEO 结构，**不采纳** |
| 产品页 Title 冗余 "AGT Equipment \| AGT Equipment" | 需验证，可能是模板问题 |

---

## 优化任务清单

### Phase 1: 基础修复 (P1)

#### 1.1 修复 PWA Icon
- [ ] 创建 icon-192.png
- [ ] 创建 icon-512.png
- [ ] 创建 apple-touch-icon.png
- [ ] 创建 favicon.ico (如果缺失)
- [ ] 验证 manifest.json 配置

#### 1.2 首页添加结构化数据
- [ ] 添加 Organization Schema (公司信息、地址、联系方式)
- [ ] 添加 WebSite Schema (站内搜索 SearchAction)
- [ ] 首页 FAQ 添加 FAQPage Schema

#### 1.3 验证产品页 Title
- [ ] 检查是否存在 "AGT Equipment | AGT Equipment" 冗余
- [ ] 如有问题，修复 title template

### Phase 2: 结构化数据完善 (P2)

#### 2.1 分类页 Schema
- [ ] 添加 CollectionPage Schema
- [ ] 添加 ItemList Schema (产品列表)
- [ ] 分类页 FAQ 添加 FAQPage Schema

#### 2.2 知识库页面 Schema
- [ ] 添加 Article Schema
- [ ] 添加 datePublished, dateModified
- [ ] 添加 author 信息
- [ ] 添加 speakable Schema (Quick Answer 部分)

#### 2.3 Solutions 页面 Schema
- [ ] 添加 Article 或 WebPage Schema
- [ ] 添加 FAQPage Schema (如有 FAQ)

### Phase 3: AEO 专项优化 (P2-P3)

#### 3.1 内容扩展
- [ ] 扩展知识库文章数量 (目标: 15-20篇)
- [ ] 添加对比类文章 (Mini Excavator vs Skid Steer)
- [ ] 添加价格指南类文章
- [ ] 添加参数问答类文章

#### 3.2 E-E-A-T 信号
- [ ] 知识库文章添加作者署名
- [ ] About 页面强化公司资质
- [ ] 添加客户评价/案例 (如有)

#### 3.3 产品页增强
- [ ] 添加产品专属 FAQ
- [ ] 添加"相关产品"交叉链接
- [ ] 添加产品视频嵌入 (如有)

### Phase 4: 长期优化 (P3)

#### 4.1 内容策略
- [ ] 建立"问题-答案"导向的内容库
- [ ] 创建对比类页面 (已有 /compare/ 路径)
- [ ] 本地 SEO 优化 (CA/IL 仓库)

#### 4.2 技术优化
- [ ] 考虑将图片迁移到 Next/Image 组件
- [ ] 添加 WebP 格式图片
- [ ] 优化 TTFB (当前约 1.27s)

---

## 不采纳的建议

| 建议 | 原因 |
|-----|------|
| 缩短产品 URL 层级 | 3层结构有利于 SEO 分类，不修改 |
| 添加 hreflang | 无多语言需求 |
| 修改 sitemap 域名指向 | agt-equipment.com 是正式域名 |

---

## 实施优先级

1. **立即执行**: Phase 1 (PWA icon + 首页 Schema)
2. **本周完成**: Phase 2 (分类页 + 知识库 Schema)
3. **下周完成**: Phase 3 (AEO 内容扩展)
4. **持续进行**: Phase 4 (长期内容策略)

---

## 技术实现说明

### 首页 Schema 示例

```tsx
// src/app/page.tsx 添加
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema';

// 在页面组件中
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        generateOrganizationSchema(),
        generateWebSiteSchema(),
      ],
    }),
  }}
/>
```

### WebSite Schema (需新增)

```typescript
// src/lib/schema.ts 添加
export function generateWebSiteSchema() {
  return {
    '@type': 'WebSite',
    name: 'AGT Equipment',
    url: 'https://agt-equipment.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://agt-equipment.com/products?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}
```

---

## 验收标准

- [ ] Google Rich Results Test 通过
- [ ] Schema.org 验证器无错误
- [ ] PWA icon 正常显示
- [ ] Lighthouse SEO 评分 > 90
