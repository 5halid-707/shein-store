import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById, getRelatedProducts, PRODUCTS } from "@/data/products";
import { ProductGallery } from "@/components/product-gallery";
import { ProductInfo } from "@/components/product-info";
import { ProductReviews } from "@/components/product-reviews";
import { ProductCard } from "@/components/product-card";
import { ChevronLeft, Home } from "lucide-react";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const related = getRelatedProducts(product, 10);

  return (
    <div className="container-app py-4">
      {/* Breadcrumb */}
      <nav className="mb-3 flex items-center gap-1 text-xs text-shein-muted">
        <Link href="/" className="flex items-center gap-1 hover:text-shein-pink">
          <Home className="h-3 w-3" />
          الرئيسية
        </Link>
        <ChevronLeft className="h-3 w-3" />
        <Link
          href={`/category/${product.category}`}
          className="hover:text-shein-pink"
        >
          {product.subcategory}
        </Link>
        <ChevronLeft className="h-3 w-3" />
        <span className="line-clamp-1 text-shein-text">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8">
        <ProductGallery images={product.images} title={product.title} />
        <ProductInfo product={product} />
      </div>

      {/* Description */}
      <section className="mt-8">
        <h2 className="mb-2 text-base font-black sm:text-lg">تفاصيل المنتج</h2>
        <div className="rounded-2xl border border-shein-border p-4 text-sm leading-7 text-shein-text">
          <p>{product.description}</p>
          <ul className="mt-3 space-y-1 text-xs text-shein-muted">
            <li>• الماركة: {product.brand}</li>
            <li>• الفئة: {product.subcategory}</li>
            <li>• المقاسات المتوفرة: {product.sizes.join(" / ")}</li>
            <li>• الألوان المتوفرة: {product.colors.map((c) => c.name).join(" / ")}</li>
            <li>• متوفر في المخزون: {product.stock} قطعة</li>
          </ul>
        </div>
      </section>

      {/* Size guide */}
      <section className="mt-6">
        <h2 className="mb-2 text-base font-black sm:text-lg">دليل المقاسات</h2>
        <div className="overflow-hidden rounded-2xl border border-shein-border">
          <table className="w-full text-sm">
            <thead className="bg-shein-gray text-xs">
              <tr>
                <th className="p-3 text-right">المقاس</th>
                <th className="p-3 text-right">الصدر (سم)</th>
                <th className="p-3 text-right">الخصر (سم)</th>
                <th className="p-3 text-right">الورك (سم)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { s: "S", c: "84-88", w: "64-68", h: "88-92" },
                { s: "M", c: "88-92", w: "68-72", h: "92-96" },
                { s: "L", c: "92-96", w: "72-76", h: "96-100" },
                { s: "XL", c: "96-100", w: "76-80", h: "100-104" },
                { s: "XXL", c: "100-104", w: "80-84", h: "104-108" },
              ].map((r) => (
                <tr key={r.s} className="border-t border-shein-border">
                  <td className="p-3 font-bold">{r.s}</td>
                  <td className="p-3 text-shein-muted">{r.c}</td>
                  <td className="p-3 text-shein-muted">{r.w}</td>
                  <td className="p-3 text-shein-muted">{r.h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reviews */}
      <ProductReviews product={product} />

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-base font-black sm:text-xl">
            منتجات مشابهة
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
            {related.slice(0, 10).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
