import {
  buildAssistantActions,
  loadKnowledgeBase,
  searchKnowledge,
} from '../src/lib/ai-assistant/knowledge';

interface Scenario {
  name: string;
  query: string;
  mustInclude: string[];
  mustNotInclude?: string[];
  actionTypes?: string[];
}

const scenarios: Scenario[] = [
  {
    name: 'Exact model lookup prefers AGT-H15R machine',
    query: 'What is the price of the H15R mini excavator?',
    mustInclude: ['product-175', 'AGT-H15R'],
    mustNotInclude: ['front blade cylinder', 'ignition switch'],
    actionTypes: ['view_product', 'add_to_cart', 'request_quote'],
  },
  {
    name: 'Return and payment policy lookup prefers policy pages',
    query: 'What is your return policy and payment terms?',
    mustInclude: ['page-return', 'page-payment'],
    mustNotInclude: ['skid steer bucket'],
    actionTypes: ['request_quote', 'contact'],
  },
  {
    name: 'Shipping policy lookup prefers delivery rules',
    query: 'How long does delivery take and do you offer free shipping?',
    mustInclude: ['page-shipping'],
    actionTypes: ['contact'],
  },
  {
    name: 'Purchase intent exposes checkout path',
    query: 'I want to buy an AGT-H15R and checkout online.',
    mustInclude: ['product-175', 'AGT-H15R'],
    actionTypes: ['add_to_cart', 'checkout'],
  },
];

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

const kb = loadKnowledgeBase();
if (!kb) {
  throw new Error('knowledge-base.json is missing. Run npm run knowledge:generate first.');
}

for (const scenario of scenarios) {
  const results = searchKnowledge(scenario.query, kb, 8);
  const haystack = results
    .map((result) => `${result.entry.id} ${result.entry.title} ${result.entry.content}`)
    .join('\n')
    .toLowerCase();
  const actions = buildAssistantActions(scenario.query, results);
  const actionTypes = actions.map((action) => action.type);

  for (const expected of scenario.mustInclude) {
    assert(
      haystack.includes(expected.toLowerCase()),
      `${scenario.name}: expected search results to include "${expected}". Got: ${results
        .map((result) => result.entry.title)
        .join(', ')}`
    );
  }

  for (const unexpected of scenario.mustNotInclude || []) {
    assert(
      !haystack.includes(unexpected.toLowerCase()),
      `${scenario.name}: search results unexpectedly included "${unexpected}".`
    );
  }

  for (const expectedType of scenario.actionTypes || []) {
    assert(
      actionTypes.includes(expectedType as typeof actionTypes[number]),
      `${scenario.name}: expected action "${expectedType}". Got: ${actionTypes.join(', ')}`
    );
  }

  console.log(`PASS ${scenario.name}`);
}

console.log('AI assistant knowledge checks passed.');
