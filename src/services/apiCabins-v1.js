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

export async function createEditCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  // avoid creating new folders
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create the cabin
  // console.log(imagePath);
  // console.log(newCabinData);
  const { data, error } = await supabase
    .from('cabins').insert([{ ...newCabin, image: imagePath }]);
  if (error)
    throw new Error("Cabin could not be created!");

  // 2. upload image
  const { error: storageError } =
    await supabase
      .storage
      .from('cabin-images')
      .upload(imageName, newCabin.image)
  if (storageError) {
    // Handle error
    await supabase
      .from("cabins")
      .delete()
      .eq("id", newCabin.id);

    throw new Error('Cabin image could not be uploaded, and the cabin was not created');
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
