import supabase, { supabaseUrl } from './supabase'

// async function getCabins() {
//   const cabins = await fetch('https://hrqxtwqgkuljmyfbiohl.supabase.co/rest/v1/cabins',
//     {
//       method: 'GET',
//       headers: {
//         'apikey': 'sb_publishable_urc9InKGZemnJgUGy_CZWw_QtM6O3EX',
//         'Authorization': 'Bearer sb_publishable_urc9InKGZemnJgUGy_CZWw_QtM6O3EX',
//       }
//     }).then((res) => res.json());

//   return cabins;
// }

export async function getCabins() {
  const { data: cabins, error } =
    await supabase.from('cabins').select('*');

  if (error)
    throw new Error(error.message);

  return cabins;
}

export async function createEditCabin(newCabin, id) {
  // console.log(id, newCabin)
  const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll('/', '');
  // avoid creating new folders

  // If it has supabase imagePath and an id
  // , it means the user was in editing session
  // , and he didn't change the image
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

  const imagePath =
    (hasImagePath)
      ? (newCabin.image)
      : (supabaseUrl
        + `/storage/v1/object/public/cabin-images/`
        + imageName);


  // 0. Storing queries in let variables to mutate
  let cabinsQuery = supabase.from('cabins');

  // create/edit the cabin
  // 1.A. create the cabin if there is no id for editing
  if (!id) {
    cabinsQuery =
      cabinsQuery.insert([{ ...newCabin, image: imagePath }])
  }
  // 1.B. Edit the cabin if there is an id
  if (id) {
    cabinsQuery =
      cabinsQuery
        .update({ ...newCabin, image: imagePath })
        .eq('id', id)
  }
  // 1.C. store data and error and handle
  const { data, error } = await cabinsQuery
    .select('*').single();
  // Cannot coerce the result to a single JSON object
  // .single();
  if (error)
    throw new Error("Cabin could not be created nor updated!");

  // 2. upload image
  // If it doesn't already have an image path
  // , it means it has a file object to upload
  if (hasImagePath) return data;
  // return data now if it has an image

  const { error: storageError } =
    await supabase
      .storage.from('cabin-images')
      .upload(imageName, newCabin.image);

  if (storageError) {
    cabinsQuery =
      await cabinsQuery
        .delete()
        .eq("id", newCabin.id);

    throw new Error(storageError.message);
    // throw new Error('Cabin image could not be uploaded, and the cabin was not created');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } =
    await supabase.from("cabins").delete().eq("id", id);

  if (error)
    throw new Error("Cabin could not be deleted!");

  return data;
}
