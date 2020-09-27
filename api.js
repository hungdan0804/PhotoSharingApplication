import Unsplash, { toJson } from "unsplash-js";
import { UNSPLASH_API_ACCESS_KEY, UNSPLASH_API_SECRET_KEY } from "@env";

const unsplash = new Unsplash({
  accessKey: `${UNSPLASH_API_ACCESS_KEY}`,
  secret: `${UNSPLASH_API_SECRET_KEY}`,
});

const jsonToObject = (json) => {
  const images = json.map(
    ({
      id,
      alt_description,
      likes,
      downloads,
      location,
      urls,
      user,
      height,
      width,
    }) => ({
      key: String(id),
      title: alt_description,
      likes: likes,
      downloads: downloads,
      location: location,
      images: urls,
      user: user,
      height: height,
      width: width,
    })
  );
  return images;
};

export const getRandomImage = async () => {
  const json = await unsplash.photos
    .getRandomPhoto({ count: 10, orientation: "portrait" })
    .then(toJson);

  const images = jsonToObject(json);

  return images;
};

export const getSearchImage = async (searchTerm, page) => {
  const { results } = await unsplash.search
    .photos(searchTerm, page.num, page.items, {
      orientation: "portrait",
    })
    .then(toJson);
  if (!results) return null;
  const images = jsonToObject(results);
  return images;
};
