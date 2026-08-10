import supabase from './supabase'

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

export async function createCabin(newCabinData) {
  // we should define destructingly the inserted data
  // , in case of any different variable names from the database,
  //  but here, we used the same names, so we don't have to make any changes
  // const newCabin = {
  //   name: newCabinData.name,
  //   description: newCabinData.description,
  //   maxCapacity: newCabinData.maxCapacity,
  //   regularPrice: newCabinData.regularPrice,
  //   discount: newCabinData.discount,
  //   image: newCabinData.image,
  // }

  console.log(newCabinData)
  const { data, error } =
    await supabase.from('cabins').insert([newCabinData]);

  if (error)
    throw new Error("Cabin could not be created!");

  return data;
}

export async function deleteCabin(id) {
  const { data, error } =
    await supabase.from("cabins").delete().eq("id", id);

  if (error)
    throw new Error("Cabin could not be deleted!");

  return data;
}
