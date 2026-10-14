// Copied from the old cost-stack page (the auditPrompt template). The old page filled the
// tool lines in from a calculator. Here the lines start as the page's own empty-list placeholder.
export const COST_STACK_PROMPT = `I want to work out which parts of my software stack I could run myself instead of paying for.

Here is what I currently pay for:

- (list your tools here, one per line, with what you pay)

Do this in order. Do not ask me questions first.

1. For each line, tell me what job it actually does in my business. Not the feature list. The job.
2. Sort them into three groups: I could replace this myself in an afternoon, I could replace this with a week of work, and I should keep paying for this.
3. For anything in the first group, give me the specific replacement and the first step to move it. Name the tool or the approach, not a category.
4. Tell me the order to do them in, easiest and highest cost first.
5. Flag anything where replacing it would put my data, my payments, or my client relationships at risk. I would rather keep paying than break something that works.
6. Finish with the one I should start with this week and why.

Be direct about which ones are not worth replacing. I am not trying to cancel everything. I am trying to stop paying for work I can now do myself.`
