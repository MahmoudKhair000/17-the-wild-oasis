import supabase, { supabaseUrl } from './supabase';

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    }
  });

  if (error) throw new Error(error);

  return data;
}



export async function login({ email, password }) {
  // let { data, error }
  // let query
  const { data, error } = await supabase
    .auth.signInWithPassword({ email, password });

  if (error) throw new Error(error);

  return data?.user;
}



export async function logout() {
  const { data, error } = await supabase.auth.signOut();

  if (error) throw new Error(error);

  return data?.user;
}



export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;


  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error);


  return data?.user;
}



export async function updateCurrentUser(
  {
    password,
    fullName,
    avatar: avatarFile
  }
) {
  // 1. Update password or fullName
  let updateData;
  if (password) updateData = { password }
  if (fullName) updateData = { data: { fullName } }
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error);
  /* return data if there is no avatar.*/
  if (!avatarFile) return data;

  // 2. Upload the avatar to the bucket
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } =
    await supabase.storage.from('avatars').upload(fileName, avatarFile);

  if (storageError) throw new Error(storageError);

  // 3. Update avatarUrl in the user if successfully updated.
  const avatarPath =
    String(
      supabaseUrl + "/storage/v1/object/public/avatars/" + fileName
    );

  const {
    data: avatarUpdateData,
    error: avatarUpdateError,
  } = await supabase.auth.updateUser({ data: { avatar: avatarPath } });
  // { data: {avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`, }, }

  if (avatarUpdateError) throw new Error(avatarUpdateError);

  return avatarUpdateData;
}