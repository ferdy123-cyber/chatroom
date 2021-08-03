import { useState } from "react";
import { connect } from "react-redux";
import "../feature/style.css";
import telephone from "../img/telephone.png";
import close from "../img/cancel.png";
import { addContact, searchContact } from "../reducer/action";

const AddContact = ({
  searchContact,
  searchContactLoading,
  showMainAddContactImg,
  availableNumber,
  addContact,
  hideContactMenu,
  listUser,
  listContacts,
  listRoomChat,
}) => {
  const [newNumber, setNewNumber] = useState("");
  const [name, setName] = useState("");
  console.log(showMainAddContactImg);
  const idContact = listUser.filter((e) => e.number === newNumber);
  console.log(listRoomChat);
  return (
    <div className="AddContactBox justify-content-center">
      <div>
        <img
          onClick={() => hideContactMenu(false)}
          className="backAddContact"
          src={close}
          width="25px"
          alt=""
        />
      </div>

      <input
        value={newNumber}
        onChange={(e) => setNewNumber(e.target.value)}
        placeholder="Masukkan nomor telepon"
        type="text"
      />
      <div className="mainAddContact">
        {showMainAddContactImg === true && (
          <img src={telephone} width="70px" alt="" />
        )}
        {showMainAddContactImg === false && (
          <div className="addContact d-flex justify-content-center">
            {availableNumber !== "Nomor tidak ditemukan!!" &&
              availableNumber !== localStorage.getItem("phoneNumber") && (
                <div>
                  {listContacts.filter(
                    (e) => String(e.contact) === String(availableNumber)
                  ).length === 0 && (
                    <input
                      className="addContactInput"
                      placeholder="Nama kontak .."
                      value={name.charAt(0).toUpperCase() + name.slice(1)}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  <p>{availableNumber}</p>
                </div>
              )}
            {availableNumber === localStorage.getItem("phoneNumber") && (
              <p>Ini adalah nomor telepon anda</p>
            )}
            {availableNumber === "Nomor tidak ditemukan!!" && (
              <p>Nomor tidak ditemukan</p>
            )}
            {availableNumber !== "Nomor tidak ditemukan!!" &&
              availableNumber !== localStorage.getItem("phoneNumber") &&
              name !== "" &&
              listContacts.filter(
                (e) => String(e.contact) === String(availableNumber)
              ).length === 0 && (
                <button
                  onClick={() =>
                    addContact(
                      {
                        name: name,
                        contact: availableNumber,
                        id: idContact[0].id,
                        listRoomChat: listRoomChat,
                      },
                      setName("")
                    )
                  }
                  className="addContactBtn"
                >
                  Tambah
                </button>
              )}
            {availableNumber !== "Nomor tidak ditemukan!!" &&
              listContacts.filter(
                (e) => String(e.contact) === String(availableNumber)
              ).length !== 0 && (
                <button className="greyBtn addContactBtn">Dimiliki</button>
              )}
          </div>
        )}
      </div>
      {searchContactLoading === false && (
        <button
          className="searchContact"
          onClick={() => searchContact(newNumber)}
        >
          Cari
        </button>
      )}
      {searchContactLoading === true && (
        <button className="progressBtn">
          <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </button>
      )}
    </div>
  );
};
const stateReducer = (state) => {
  return {
    listUser: state.listUser,
    searchContactLoading: state.searchContactLoading,
    showMainAddContactImg: state.showMainAddContactImg,
    availableNumber: state.availableNumber,
    listContacts: state.listContacts,
    listRoomChat: state.listRoomChat,
  };
};

const dispatchReducer = (dispatch) => ({
  searchContact: (data) => dispatch(searchContact(data)),
  addContact: (data) => dispatch(addContact(data)),
  hideContactMenu: (data) =>
    dispatch({
      type: "SHOW_ADD_CONTACT",
      value: data,
    }),
});

export default connect(stateReducer, dispatchReducer)(AddContact);
