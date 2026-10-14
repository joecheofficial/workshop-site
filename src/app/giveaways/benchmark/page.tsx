import PackPage from '@/components/giveaways/PackPage'
import { BENCHMARK_PACK } from './pack'

// AI Model Benchmark Comparison giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

export default function BenchmarkPage() {
  return <PackPage slug="benchmark" content={BENCHMARK_PACK} />
}
