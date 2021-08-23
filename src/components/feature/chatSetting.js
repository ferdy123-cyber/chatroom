import { useState } from "react";
import { connect } from "react-redux";
import { addContact, deleteRoomChat, cleanChat } from "../reducer/action";

const ChatSetting = ({
  roomId,
  addContact,
  listRoomChat,
  setChatSetting,
  deleteRoomChat,
  chats,
  cleanChat,
  contactProfil,
  setOpenChat,
}) => {
  const [name, setName] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const add = (data) => {
    setName("");
    addContact(data);
    setChatSetting(false);
    setOpenChat(false);
  };

  const delroom = (data) => {
    deleteRoomChat(data);
    setChatSetting(false);
    setOpenChat(false);
  };

  const cleanchat = (data) => {
    cleanChat(data);
    setChatSetting(false);
  };

  const closeConfirm = () => {
    setOpenConfirm(false);
    setChatSetting(false);
  };
  console.log(contactProfil);
  return (
    <div
      className={
        contactProfil === false
          ? "openMenu shadow bg-body rounded d-flex justify-content-start align-items-center"
          : "openmenugeser shadow bg-body rounded d-flex justify-content-start align-items-center"
      }
    >
      {openConfirm === false && (
        <div className="li">
          {roomId.destinationName === "" && (
            <p onClick={() => setOpenConfirm("addContact")}>Tambah kontak</p>
          )}
          <p onClick={() => setOpenConfirm("deleteChat")}>Hapus chat</p>
          <p onClick={() => setOpenConfirm("cleanChat")}>Bersihkan chat</p>
        </div>
      )}
      {openConfirm === "addContact" && (
        <div className="confirmField-chatSetting d-flex justify-content-center align-items-center ">
          <div className="confirm shadow text-start">
            <h2>Tambahkan ke kontak?</h2>
            <div className="d-flex justify-content-start align-items-center">
              <p className="lbl">Nama</p>
              <input
                value={name.charAt(0).toUpperCase() + name.slice(1)}
                onChange={(e) => setName(e.target.value)}
                autoFocus="autoFocus"
                maxLength="13"
                className="val"
              />
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <p className="lbl">Nomor</p>
              <b>
                <p className="val">{roomId.destination}</p>
              </b>
            </div>
            <div className="btnconfirm text-end">
              <button
                onClick={() => closeConfirm(false)}
                className="btnconfirm1"
              >
                Tidak
              </button>
              <button
                onClick={() =>
                  add({
                    name: name,
                    contact: roomId.destination,
                    id: roomId.destinationUserId,
                    listRoomChat: listRoomChat,
                  })
                }
                className="btnconfirm2"
              >
                Tambah kontak
              </button>
            </div>
          </div>
        </div>
      )}
      {openConfirm === "cleanChat" && (
        <div className="confirmField d-flex justify-content-center align-items-center ">
          <div className="confirm shadow text-start">
            <p>Bersihkan chat?</p>

            <div className="btnconfirm text-end">
              <button
                className="btnconfirm1"
                onClick={() => closeConfirm(false)}
              >
                Tidak
              </button>
              <button
                onClick={() =>
                  cleanchat({
                    userId: roomId.userId,
                    roomId: roomId.myRoomId,
                    chats: chats,
                  })
                }
                className="btnconfirm2"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
      {openConfirm === "deleteChat" && (
        <div className="confirmField d-flex justify-content-center align-items-center ">
          <div className="confirm shadow text-start">
            {roomId.destinationName !== "" && (
              <p>Hapus chat dengan "{roomId.destinationName}" ?</p>
            )}
            {roomId.destinationName === "" && (
              <p>Hapus chat dengan "{roomId.destination}" ?</p>
            )}

            <div className="btnconfirm text-end">
              <button
                className="btnconfirm1"
                onClick={() => closeConfirm(false)}
              >
                Tidak
              </button>
              <button
                onClick={() =>
                  delroom({
                    userId: roomId.userId,
                    roomId: roomId.myRoomId,
                  })
                }
                className="btnconfirm2"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const stateReducer = (state) => {
  return {
    roomId: state.roomId,
    listRoomChat: state.listRoomChat,
    chats: state.chats,
    contactProfil: state.contactProfil,
  };
};

const dispatchReducer = (dispatch) => ({
  addContact: (data) => dispatch(addContact(data)),
  deleteRoomChat: (data) => dispatch(deleteRoomChat(data)),
  cleanChat: (data) => dispatch(cleanChat(data)),
  setChatSetting: (data) =>
    dispatch({
      type: "CHAT_SETTING",
      value: data,
    }),
  setOpenChat: (value) =>
    dispatch({
      type: "OPEN_CHAT",
      value: value,
    }),
});

export default connect(stateReducer, dispatchReducer)(ChatSetting);