import contactsService from "@/services/contacts.service";
import style from "./contacts.module.scss";

export const getStaticProps = async () => {
  const data = await contactsService.fetchAll();

  if (!data) {
    return { notFound: true };
  }

  return {
    props: { contacts: data },
    revalidate: 10,
  };
};

const Contacts = ({ contacts }) => {
  return (
    <main className={style.main}>
      <section className={style.map}>карта</section>
      <section className={style.content}>{contacts && contacts.map((item) => <div>{JSON.stringify(item)}</div>)}</section>
    </main>
  );
};

export default Contacts;
