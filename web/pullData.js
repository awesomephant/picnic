const sanityClient = require("@sanity/client");
const slugify = require("slugify");
const fs = require("fs");

const client = sanityClient({
  projectId: "j6e3tx4f",
  dataset: "production",
  token: "",
  useCdn: false,
});

const query =
  '*[_type == "residency"]{date, artist_name, website, support_link, code}';
client.fetch(query, {}).then((residencies) => {
  const sortedResidencies = residencies.sort((a, b) => {
    const da = new Date(a.date);
    const db = new Date(b.date);
    return db - da;
  });
  sortedResidencies.forEach((r, i) => {
    sortedResidencies[i].slug = slugify(r.artist_name, { lower: true });
  });

  fs.writeFileSync(
    "./src/data/residencies.json",
    JSON.stringify(sortedResidencies, null, " ")
  );
  console.log(`Wrote ${residencies.length} residencies.`);
});

const settingsQuery =
  '*[_type == "siteSettings"]{currentResidency->{artist_name}}';
client.fetch(settingsQuery, {}).then((settings) => {
  settings[0].currentResidency.slug = slugify(
    settings[0].currentResidency.artist_name,
    { lower: true }
  );
  fs.writeFileSync(
    "./src/data/settings.json",
    JSON.stringify(settings[0], null, " ")
  );
  console.log("Wrote site settings");
});
