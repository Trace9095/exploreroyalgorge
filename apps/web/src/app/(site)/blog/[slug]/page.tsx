import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOG_POSTS, getBlogPostBySlug } from '@/data/blog'
import type { BlogBlock } from '@erg/shared'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function renderBlock(block: BlogBlock, idx: number) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={idx} className="mt-8 mb-3 text-2xl font-bold text-foreground">
          {block.text}
        </h2>
      )
    case 'p':
      return (
        <p key={idx} className="mb-4 text-base leading-relaxed text-muted">
          {block.text}
        </p>
      )
    case 'ul':
      return (
        <ul key={idx} className="mb-4 ml-4 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex min-h-[44px] items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to guides
        </Link>

        <article>
          <header className="mb-10">
            {post.category && (
              <span className="mb-4 inline-block rounded-full border border-border bg-background px-3 py-0.5 text-xs font-medium text-muted capitalize">
                {post.category.replace('-', ' ')}
              </span>
            )}
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">{post.excerpt}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted/60 border-t border-border pt-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readingTime} min read
              </span>
            </div>
          </header>

          <div className="blog-content">
            {post.content.map((block, idx) => renderBlock(block, idx))}
          </div>

          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-background px-3 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>

        <div className="mt-16 rounded-2xl border border-gold/20 bg-gold/5 p-8 text-center">
          <h2 className="text-xl font-bold text-foreground">Ready to explore the Royal Gorge?</h2>
          <p className="mt-2 text-muted">
            Browse all adventures, book tours, and discover what&apos;s waiting in Canon City, Colorado.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/directory"
              className="min-h-[44px] inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              style={{ background: '#D4A853' }}
            >
              Browse Directory
            </Link>
            <Link
              href="/adventures"
              className="min-h-[44px] inline-flex items-center gap-2 rounded-xl border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold/30"
            >
              All Adventures
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
