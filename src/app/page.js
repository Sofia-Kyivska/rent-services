import Hero from '@/components/Hero/Hero';


export default function Home() {
  // const jsonLd = {
  //   '@context': 'http://schema.org',
  //   '@type': 'BreadcrumbList',
  //   itemListElement: {
  //     '@type': 'ListItem',
  //     position: 1,
  //     item: {
  //       '@id': process.env.NEXT_PUBLIC_SEO_URL,
  //       name: 'Sofia Rent Kyiv - оренда квартири Київ. Квартири подобово.',
  //     },
  //   },
  // };


  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /> */}
      <Hero />
    </>
  );
}