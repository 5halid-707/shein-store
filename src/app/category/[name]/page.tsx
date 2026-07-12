import { CategoryClient } from "@/components/category-client";
import { CATEGORIES } from "@/data/products";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const validSlugs = ["all", ...CATEGORIES.map((c) => c.slug)];

export function generateStaticParams() {
  return validSlugs.map((name) => ({ name }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  if (!validSlugs.includes(name)) notFound();
  return (
    <Suspense
      fallback={
        <div className="container-app py-12 text-center text-sm text-shein-muted">
          جاري التحميل...
        </div>
      }
    >
      <CategoryClient category={name} />
    </Suspense>
  );
}
