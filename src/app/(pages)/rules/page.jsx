import RulesComponent from "@/components/RulesComponent/RulesComponent";
import { cookies } from 'next/headers';


export async function generateMetadata({ params }) {
  const data = {
    ua: {
      title: "Квартири подобово Sofia Rent Kyiv ⭐ оренда квартири Київ",
      description: "Оренда квартир подобово або погодинно Київ ⭐ Зняти квартиру на добу, день або ніч ✔️ Квартири подобово на Sofia Rent Kyiv.",
      keywords: ["Квартири подобово", "оренда квартири", "Київ", "Sofia Rent", "Зняти квартиру"],
    },
    en: {
      title: "Apartments for rent Sofia Rent Kyiv ⭐ apartment for rent in Kyiv",
      description: "Apartments for rent by the day or hour in Kyiv ⭐ Rent an apartment for a day, night or week ✔️ Apartments for rent in Kyiv on Sofia Rent Kyiv.",
      keywords: ["Apartments for rent", "Kyiv", "Sofia Rent", "apartment for a day", "rent"],
    },
    ru: {
      title: "Аренда квартир посуточно Киев ⭐ квартиры посуточно в Киеве",
      description: "Посуточная или почасовая аренда квартир в Киеве ⭐ Аренда квартир на сутки, ночь или неделю ✔️ Аренда квартир в Киеве посуточно Kyiv.",
      keywords: ["Аренда квартир", "Киев", "посуточно", "Sofia Rent", "Квартиры"],
    },
  };

  const language = cookies().get('language')?.value || 'ua';

  const { title, description, keywords } = data[language] || data.ua;

  return {
    title,
    description,
    keywords,
    // alternates: {
    //   canonical: `${process.env.NEXT_PUBLIC_SEO_URL}rules`,
    // },
  };
}


const RulesPage = () => {
  // const jsonLd = {
  //   "@context": "http://schema.org",
  //   "@type": "BreadcrumbList",
  //   itemListElement: [
  //     {
  //       "@type": "ListItem",
  //       position: 1,
  //       item: {
  //         "@id": process.env.NEXT_PUBLIC_SEO_URL,
  //         name: "Sofia Rent Kyiv - оренда квартири Київ. Квартири подобово.",
  //       },
  //     },
  //     {
  //       "@type": "ListItem",
  //       position: 2,
  //       item: {
  //         "@id": `${process.env.NEXT_PUBLIC_SEO_URL}rules`,
  //         name: "Sofia Rent Kyiv Правила",
  //       },
  //     },
  //   ],
  // };


  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /> */}
      <RulesComponent />
    </>
  );
};


export default RulesPage;