function UserAbout({ user }) {
  return (
    <ul>
      <li>{user.birthday}</li>
      <li>{user.gender}</li>
      <li>{user.bio}</li>
    </ul>
  );
}

export default UserAbout;
