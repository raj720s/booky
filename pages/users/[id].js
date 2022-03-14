import React from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
function Data({ id, user }) {
  // console.log(id, user);

  return (
    <div className={styles.container}>
      <table id="users">
        <tr>
          <th>name</th>
          <th>email</th>
          <th>phone</th>
          <th>site</th>
        </tr>
        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.website}</td>
        </tr>
      </table>
      <Link href="/users">
        <a style={{ marginTop: "3rem" }}>
          <b>Go Back</b>
        </a>
      </Link>
    </div>
  );
}

// export const getServerSideProps = async (context) => {
//   const id = context.params.id;
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//   const user = await res.json();
//   if (!id || id > 10) {
//     return {
//       redirect: {
//         destination: "/users",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       id: id,
//       user: user,
//     },
//   };
// };

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await res.json(); // await is used here to convert ioonto json

  return {
    props: {
      id: id,
      user: user,
    },
  };
};
export const getStaticPaths = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/`);
  const users = await res.json();
  const ids = users.map((user) => user.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));
  return {
    paths: paths,
    fallback: false, // See the "fallback" section below
  };
};

export default Data;
