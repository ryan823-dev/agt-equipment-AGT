# AGT Equipment SEO/AEO 重构计划

> **核心目标**：SEO 负责拿"高意图搜索流量"，AEO 负责让页面成为"可被 AI 直接抽取和引用的答案源"

---

## 一、核心理念转变

| 当前状态 | 目标状态 |
|---------|---------|
| 按"商品上传逻辑"组织 | 按"搜索意图逻辑"组织 |
| 商品列表式呈现 | 答案型电商站 |
| 每页一个样 | 每种页面一个模板 |
| 内容分散 | 资产池重组 |

---

## 二、四层架构设计

```
┌─────────────────────────────────────────────────────────────────┐
│ 第1层：核心交易目录（承接大词和品牌词）                          │
├─────────────────────────────────────────────────────────────────┤
│ /mini-excavators/        /mini-skid-steers/                    │
│ /attachments/            /parts/                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 第2层：规格/细分目录（承接规格词）                               │
├─────────────────────────────────────────────────────────────────┤
│ /mini-excavators/1-ton/          /mini-excavators/1-2-ton/     │
│ /mini-excavators/3-4-ton/        /mini-skid-steers/stand-on/   │
│ /mini-skid-steers/track/         /attachments/mini-excavator/  │
│ /attachments/skid-steer/         /parts/filters/               │
│ /parts/hydraulic-parts/          /parts/engine-parts/          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 第3层：场景/决策页（SEO + AEO 关键层）                          │
├─────────────────────────────────────────────────────────────────┤
│ Solutions:                                                      │
│ /solutions/farm-use-mini-excavators/                           │
│ /solutions/backyard-access-mini-excavators/                    │
│ /solutions/landscaping-mini-skid-steers/                       │
│                                                                 │
│ Compare:                                                        │
│ /compare/mini-excavator-vs-mini-skid-steer/                    │
│ /compare/kubota-vs-rato-mini-excavator/                        │
│ /compare/1-ton-vs-2-ton-mini-excavator/                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 第4层：支持与知识中心（强信任资产）                              │
├─────────────────────────────────────────────────────────────────┤
│ /support/manuals/           /support/shipping-delivery/        │
│ /support/financing/         /support/warranty/                 │
│ /support/maintenance/       /support/parts-compatibility/      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 三、页面模板标准化

### 3.1 分类页模板 (Category Page)

**目标**：不只是"展示商品"，而是回答用户问题

```
┌─────────────────────────────────────────────────────────────────┐
│ [H1] 分类名称 + 核心关键词                                       │
├─────────────────────────────────────────────────────────────────┤
│ [导购摘要] 150-300字，回答：这类机器适合谁？怎么选？主要差别？   │
├─────────────────────────────────────────────────────────────────┤
│ [对比表] "如何选择" - 规格对比、价格对比、适用场景对比          │
├─────────────────────────────────────────────────────────────────┤
│ [热门型号] 6-10款推荐产品卡片                                   │
├─────────────────────────────────────────────────────────────────┤
│ [FAQ] 6-10个常见问题（带 FAQPage Schema）                       │
├─────────────────────────────────────────────────────────────────┤
│ [内链区块]                                                      │
│ → 下一级细分类                                                  │
│ → 对比页                                                        │
│ → 运费/融资/manual 页                                           │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 产品页模板 (Product Page)

```
┌─────────────────────────────────────────────────────────────────┐
│ [H1] 型号 + 核心关键词（如：AGT H15R 1-Ton Mini Excavator）     │
├─────────────────────────────────────────────────────────────────┤
│ [摘要] 50-80字直给，包含核心卖点和价格                          │
├─────────────────────────────────────────────────────────────────┤
│ [规格表] 关键参数结构化展示（Engine, Power, Weight, Dig Depth） │
├─────────────────────────────────────────────────────────────────┤
│ [适用场景] 3-5个典型使用场景                                    │
├─────────────────────────────────────────────────────────────────┤
│ [附件兼容] 该机型可搭配的附件列表                               │
├─────────────────────────────────────────────────────────────────┤
│ [配件/耗材] 滤芯、液压油等易耗品                                │
├─────────────────────────────────────────────────────────────────┤
│ [发货说明] 运输方式、卸货要求、到货时间                         │
├─────────────────────────────────────────────────────────────────┤
│ [信任信号] 保修政策 | Manual下载 | 融资方案                     │
├─────────────────────────────────────────────────────────────────┤
│ [FAQ] 6-8个产品级问题                                           │
├─────────────────────────────────────────────────────────────────┤
│ [媒体区] 视频与高清图片库                                       │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 零件/附件页模板 (Parts & Attachments Page)

```
┌─────────────────────────────────────────────────────────────────┐
│ [H1] 零件名称 + 零件号                                          │
├─────────────────────────────────────────────────────────────────┤
│ [兼容机型] 明确列出兼容/不兼容型号                              │
├─────────────────────────────────────────────────────────────────┤
│ [零件信息] 零件号 | OEM号 | 适用发动机/机型                     │
├─────────────────────────────────────────────────────────────────┤
│ [维护信息] 更换周期 | 安装提示                                  │
├─────────────────────────────────────────────────────────────────┤
│ [故障症状] 常见故障现象及判断方法                               │
├─────────────────────────────────────────────────────────────────┤
│ [相关文档] Manual | Support 文档链接                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 四、关键词分组策略

| 分组 | 示例关键词 | 承接页面 |
|-----|-----------|---------|
| **品类大词** | mini excavators, mini skid steers, mini excavator attachments | 首页、一级分类页 |
| **规格词** | 1 ton mini excavator, Kubota diesel mini excavator, mini excavator with hydraulic thumb | 二级分类页、产品页 |
| **场景词** | mini excavator for farm use, backyard mini excavator, mini excavator for trenching | Solutions 页面 |
| **对比词** | mini excavator vs mini skid steer, RATO vs Kubota, 1 ton vs 2 ton | Compare 页面 |
| **零件/维护词** | hydraulic thumb for H15, Perkins fuel filter, mini excavator maintenance | Parts 页面、Support 页面 |

---

## 五、AEO 实现方案

### 5.1 答案块结构 (Answer Block)

每个重要页面添加结构化答案块：

```html
<section class="answer-block">
  <h2>What is a 1 ton mini excavator best for?</h2>
  <p class="direct-answer">
    A 1-ton mini excavator is best for trenching, landscaping, backyard access,
    and property maintenance where space is limited.
  </p>
  <ul class="key-facts">
    <li>Dig depth: 5-7 feet typical</li>
    <li>Width: 36-42 inches (fits through standard gates)</li>
    <li>Weight: 2,400-2,800 lbs (towable with standard trailer)</li>
    <li>Engine options: RATO or Kubota diesel</li>
  </ul>
  <table class="comparison-table">...</table>
</section>
```

### 5.2 追问埋点策略

每个页面解决一个主问题，但埋入追问链接：

```
主问题：Best mini excavator for farm use
├── 追问1：What width fits a gate? → 链接到 /solutions/backyard-access/
├── 追问2：What engine is better? → 链接到 /compare/kubota-vs-rato/
├── 追问3：Do I need a thumb? → 链接到 /attachments/hydraulic-thumb/
└── 追问4：How is it delivered? → 链接到 /support/shipping-delivery/
```

### 5.3 答案 + 商品闭环

```
场景页结构：
1. 先回答场景问题（答案块）
2. 再推荐 3 款机器（产品卡片）
3. 再列适配附件（附件列表）
4. 再链接 shipping / financing / manual（支持页面）
```

---

## 六、技术 SEO 清单

### 6.1 URL 设计

```
✅ 采用规范：
/mini-excavators/
/mini-excavators/1-ton/
/mini-excavators/1-ton/agt-h15r/
/attachments/mini-excavator/hydraulic-thumb-h12-h15/
/parts/filters/perkins-fuel-filter-130306132/

❌ 避免：
/products/agt-h15r-mini-excavator-1-ton-rato-engine (过长)
/product?id=123 (参数URL)
/excavators-mini (关键词顺序混乱)
```

### 6.2 结构化数据清单

| 页面类型 | Schema 类型 | 优先级 |
|---------|------------|-------|
| 产品页 | Product + AggregateRating + Offer | P0 |
| 分类页 | ItemList | P0 |
| FAQ区块 | FAQPage | P0 |
| 面包屑 | BreadcrumbList | P0 |
| 文章页 | Article | P1 |
| 组织页 | Organization | P1 |
| 退货政策 | MerchantReturnPolicy | P2 |
| 产品变体 | ProductGroup | P2 |

### 6.3 Sitemap 拆分

```
/sitemap.xml (索引文件)
├── /product-sitemap.xml
├── /category-sitemap.xml
├── /article-sitemap.xml
├── /support-sitemap.xml
├── /image-sitemap.xml
└── /video-sitemap.xml
```

### 6.4 渲染策略

| 内容类型 | 渲染方式 | 原因 |
|---------|---------|------|
| 标题、正文、FAQ | SSR | 首屏HTML可见 |
| 规格表 | SSR | 结构化数据需要 |
| 产品列表 | SSR | 链接可抓取 |
| 筛选/分页 | SSR + `<a href>` | 真实URL可抓取 |
| 结构化数据 | JSON-LD (SSR) | 不依赖渲染 |

---

## 七、迁移策略

### 7.1 URL 映射表

| 旧站 URL | 新站 URL | 状态 |
|---------|---------|------|
| /products/agt-h15r-mini-excavator | /mini-excavators/1-ton/agt-h15r/ | 301 |
| /collections/mini-excavators | /mini-excavators/ | 301 |
| /pages/shipping | /support/shipping-delivery/ | 301 |
| /pages/financing | /support/financing/ | 301 |
| /pages/manuals | /support/manuals/ | 301 |

### 7.2 必须保留的资产

- [ ] 型号名
- [ ] 参数表
- [ ] 兼容型号说明
- [ ] Manual 文件
- [ ] Shipping 说明
- [ ] Financing 说明
- [ ] Warranty 条款
- [ ] FAQ 内容
- [ ] 图片与视频

### 7.3 迁移监控

```
Search Console 监控项目（3个月）：
├── 索引页数量变化
├── 404 / soft 404 数量
├── 已发现未索引页面
├── Rich result 报错
└── 核心分类页点击/展现变化
```

---

## 八、90天执行计划

### Phase 1: 基础盘搭建 (Day 1-30)

**Week 1-2: 架构与URL**
- [ ] 完成 URL 规划
- [ ] 制作旧新 URL 映射表
- [ ] 设计 4 层目录结构
- [ ] 创建 Next.js 动态路由

**Week 3-4: 核心页面上线**
- [ ] 4 个一级分类页（带模板）
- [ ] 8-12 个二级分类页
- [ ] 20 个重点产品页（新模板）
- [ ] Support 中心 4 页（manual/shipping/financing/warranty）

**Week 4: 技术基础**
- [ ] Search Console 接入
- [ ] Merchant Center 接入
- [ ] Sitemap 拆分上线
- [ ] 核心 Schema 上线
- [ ] 301 重定向配置

### Phase 2: 高意图内容 (Day 31-60)

**Week 5-6: 决策页面**
- [ ] 10 个 Comparison 页面
- [ ] 10 个 Scenario/Solutions 页面
- [ ] 10 个 Compatibility 页面

**Week 7-8: 内容增强**
- [ ] 所有分类页补 FAQ + 对比表
- [ ] 产品页补视频、manual、耗材内链
- [ ] 零件页补兼容机型表

### Phase 3: AEO 强化 (Day 61-90)

**Week 9-10: 维护内容**
- [ ] Maintenance 集群页面
- [ ] Troubleshooting 集群页面
- [ ] 产品级 Reviews 采集展示

**Week 11-12: 优化与监控**
- [ ] 图片 alt 全面检查
- [ ] 视频摘要添加
- [ ] 问答模块上线
- [ ] Search Console 反查优化
- [ ] 低价值筛选页 noindex

---

## 九、KPI 指标体系

### SEO 指标
- 一级分类页 impressions / clicks
- 核心产品页 impressions / clicks
- 长尾零件页收录率
- 非品牌词点击占比

### AEO 指标
- 问答型页面长尾曝光
- "how/what/best/vs/fit/compatible" 类 query 增长
- AI 概览引用页面占比（手动抽查）
- 品牌名 + 机型名 + use case 查询表现

### 技术指标
- 富结果错误数
- 发现未索引页数量
- 404 / redirect chain 数
- 页面可抓取率

### 商业指标
- 分类页→产品页点击率
- 产品页→询盘/下单率
- Support 页辅助转化率
- Parts/Attachments 自然成交占比

---

## 十、实现优先级排序

### P0 - 必须实现（Phase 1）
1. 四层 URL 架构
2. 分类页模板（含 FAQ、对比表）
3. 产品页模板（含答案块）
4. Support 中心
5. 结构化数据（Product, ItemList, FAQPage, BreadcrumbList）
6. Sitemap 拆分
7. 301 重定向

### P1 - 重要实现（Phase 2）
1. Comparison 页面
2. Solutions/Scenario 页面
3. Compatibility 页面
4. 零件页模板增强
5. Article Schema

### P2 - 增强实现（Phase 3）
1. Maintenance 集群
2. Troubleshooting 集群
3. Reviews 展示
4. MerchantReturnPolicy Schema
5. ProductGroup Schema

---

## 十一、待讨论确认项

1. **URL 迁移策略**：是否保留原站域名做301，还是直接在新域名上线？
2. **内容优先级**：现有内容有限，先做哪些分类页？
3. **Comparison 页面**：对比内容谁来产出？
4. **Manuals 资产**：原站 manual 文件是否都有？
5. **资源投入**：90天计划的执行人力安排？

---

*文档版本: v1.0*
*创建日期: 2026-03-08*
*状态: 待讨论*
