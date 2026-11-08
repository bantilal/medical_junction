import { PageHero } from "./PageHero";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero title={title} crumbs={[{ name: title, path }]} />
      <section className="section">
        <div className="container-x max-w-3xl space-y-5 leading-relaxed text-ink/90 [&_h2]:mt-8 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-brand-900 [&_li]:ml-5 [&_li]:list-disc [&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline">
          <p className="text-sm text-muted">Last updated: {updated}. This is a starter template - have it reviewed by a legal adviser before launch.</p>
          {children}
        </div>
      </section>
    </>
  );
}
