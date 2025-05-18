
const baseUrl = process.env.NEXT_PUBLIC_SEO_URL;

export const getDataForSeo = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/apartments`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


export default async function sitemap() {
  const data = await Promise.resolve().then(() => getDataForSeo());

  const apartmentsId = data?.map((el) => ({
    url: `${baseUrl}apartments/${el._id}`,
    lastModified: new Date(el.updatedAt).toISOString(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const routes = [
    {
      name: "",
      priority: 1.0,
    },
    {
      name: "apartments",
      priority: 0.8,
    },
    {
      name: "rules",
      priority: 0.6,
    },
  ].map((route) => ({
    url: `${baseUrl}${route.name}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: route.priority,
  }));

  return [...routes, ...apartmentsId];
}