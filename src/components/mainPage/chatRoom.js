import "../mainPage/style.css";
import menuIcon from "../img/menu.png";
import chat from "../img/chat.png";
import avatar2 from "../img/user.png";
// import search from "../img/search.png";
import addVideo from "../img/play-button (1).png";
import addPhoto from "../img/images.png";
import check1 from "../img/checkmark-512 (1).png";
import check2 from "../img/checkmark-512.png";
import play from "../img/play-button-28243.png";
import iconVideo from "../img/play-button.png";
import emoji from "../img/grinning.png";
import send from "../img/send.png";
import close from "../img/left-turn-arrow.png";
import close2 from "../img/cancel.png";
import noTelepone from "../img/vintage-telephone-call.png";
import AutoScroll from "react-scrollable-feed";
import ListContact from "../feature/listContact";
import Chatsetting from "../feature/chatSetting";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Profil from "./profil";
import ContactProfil from "./contactProfil";
import Emoji from "../emojies";
import downArrow from "../img/arrow-203-24.png";
import downArrow2 from "../img/arrow-203-24 (1).png";
import camera from "../img/photo-camera.png";
// import { Link, animateScroll as scroll } from "react-scroll";
import {
  getContact,
  getUser,
  getRoom,
  getRoomContact,
  sendChat,
  getChats,
  getAccount,
  getRoomId,
  loadProfilRoom,
  SendImage,
  deleteChat,
} from "../reducer/action";
import AddContact from "../feature/addcontact";
import moment from "moment";
import ReactPlayer from "react-player/lazy";

const ChatRoom = ({
  getChats,
  showListContact,
  addAccount,
  showContact,
  getContact,
  showAddContact,
  showAddContactMenu,
  listRoomChat,
  getUser,
  listUser,
  getAccount,
  hideContactMenu,
  getRoom,
  chats,
  roomId,
  sendChat,
  getRoomId,
  getRoomContact,
  account,
  assetLoading,
  roomProfil,
  loadProfilRoom,
  contactProfil,
  showContactProfil,
  SendImage,
  contentImageLoading,
  progressImage,
  deleteChat,
  setChatSetting,
  chatSetting,
  searchInput,
  setSearchInput,
}) => {
  if (!localStorage.getItem("chatLogin")) {
    localStorage.setItem("chatLogin", "false");
  }
  const [showmenu, setShowmenu] = useState(false);
  const [chatContent, setChatContent] = useState("");
  const [collapsChat, setCollapsChat] = useState("chatContent");
  const [openChatOpt, setOpenChatOpt] = useState("");
  const [chatOpt, setChatOpt] = useState("");
  const [openImg, setOpenImg] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [forwardChat, setForwardChat] = useState(false);
  const [forwardMessage, setForwardMessage] = useState({
    name: "",
    chat: "",
    type: "",
    forwardSenderId: "",
    forwardChatId: "",
  });
  const [openDelChat, setOpenDelChat] = useState(false);
  const [delId, setDelId] = useState({});
  const [param, setParam] = useState("");
  // const showMenu = () => {
  //   if (showmenu === false) {
  //     setShowmenu(true);
  //   }
  //   if (showmenu === true) {
  //     setShowmenu(false);
  //   }
  // };

  const hideMenu = () => {
    if (showmenu === true || chatSetting === true) {
      setShowmenu(false);
      setChatSetting(false);
    }
  };
  useEffect(() => {
    getUser();
  }, [getUser]);
  useEffect(() => {
    getRoom();
  }, [getRoom]);
  useEffect(() => {
    getRoomContact();
  }, [getRoomContact]);
  useEffect(() => {
    getChats(roomId);
  }, [getChats, roomId]);
  useEffect(() => {
    loadProfilRoom(listRoomChat);
  }, [loadProfilRoom, listRoomChat]);
  useEffect(() => {
    getAccount();
  }, [getAccount]);

  const Send = (data) => {
    setChatContent("");
    setCollapsChat("chatContent");
    setForwardChat(false);
    setOpenEmoji(false);
    sendChat(data);
  };
  const OpenEmoji1 = () => {
    setOpenEmoji(true);
    setForwardChat(false);
    setCollapsChat("chatContent2");
  };

  const OpenEmoji2 = () => {
    setOpenEmoji(true);
    setCollapsChat("chatContent4");
  };

  const CloseEmoji1 = () => {
    setOpenEmoji(false);
    setCollapsChat("chatContent");
  };

  const CloseEmoji2 = () => {
    setOpenEmoji(false);
    setCollapsChat("chatContent3");
  };

  const RoomId = (data) => {
    getRoomId(data);
    CloseEmoji1();
    setForwardChat(false);
  };

  const functionOpenImg = (url) => {
    setOpenImg(true);
    setImage(url);
  };

  const functionOpenVideo = (url) => {
    setOpenVideo(true);
    setVideo(url);
  };
  const openForward = (data) => {
    setForwardChat(true);
    setOpenEmoji(false);
    setChatOpt(false);
    setCollapsChat("chatContent3");
    setForwardMessage({
      name: data.name,
      chat: data.chat,
      type: data.type,
      forwardSenderId: data.forwardSenderId,
      forwardChatId: data.forwardChatId,
    });
  };

  const closeForwardChat1 = () => {
    setForwardChat(false);
    setCollapsChat("chatContent");
  };

  const closeForwardChat2 = () => {
    setForwardChat(false);
    setCollapsChat("chatContent2");
  };

  const confirmDelChat = (data) => {
    setDelId(data);
    setOpenDelChat(true);
  };

  const closeDelChat = () => {
    setOpenDelChat(false);
    deleteChat(delId);
  };

  const sendImage = (data) => {
    setForwardChat(false);
    setOpenEmoji(false);
    setCollapsChat("chatContent");
    SendImage(data);
  };

  const hide = () => {
    hideMenu();
  };

  console.log(roomId);
  console.log(param);

  return (
    <div className="root justify-content-center align-items-center">
      {openImg === true && (
        <div className="openImg position-fixed">
          <div
            className="d-flex justify-content-end"
            onClick={() => setOpenImg(false)}
          >
            <img className="closeImg" src={close} alt="" />
          </div>
          <img className="profilImgShow" src={image} alt="" />
        </div>
      )}
      {openVideo === true && (
        <div className="openImg position-fixed">
          <div
            className="d-flex justify-content-end"
            onClick={() => setOpenVideo(false)}
          >
            <img className="closeImg" src={close} alt="" />
          </div>
          <ReactPlayer
            playing
            width="80%"
            height="80vh"
            className="profilVideoShow"
            url={video}
            controls
          />
        </div>
      )}
      {assetLoading === true && <div>loading</div>}
      {assetLoading === false && (
        <div className="row main d-flex justify-content-center shadow p-3 mb-5 bg-body ">
          <div
            className="ChatBox d-flex justify-content-between col row"
            onClick={() => hide()}
          >
            {showAddContact === false && (
              <div className="listRoom d-flex align-items-center border-end border-2 col-4">
                <div className="left ">
                  <button className="newChatBtn d-flex justify-content-center align-items-center">
                    <div
                      onClick={() => showContactProfil("myProfil")}
                      className="span2"
                    >
                      Profil
                    </div>
                    <div
                      onClick={() => showContact(true)}
                      className="span1 border-start border-end border-dark"
                    >
                      <img
                        onClick={() => hideContactMenu(false)}
                        src={noTelepone}
                        width="20px"
                        alt="plusIcon"
                      />
                    </div>
                    <div
                      onClick={() => showAddContactMenu(true)}
                      className="entahlah span2"
                    >
                      Tambah kontak
                    </div>
                  </button>

                  <div className="row menuChat d-flex justify-content-between">
                    {showListContact === false && (
                      <p className="col-3">Chats</p>
                    )}
                    {showListContact === true && (
                      <p className="col-3">
                        <img
                          onClick={() => showContact(false)}
                          className="backListContact"
                          alt=""
                          src={close}
                          width="20px"
                        />
                      </p>
                    )}
                  </div>
                  {showmenu === true && (
                    <div className="openMenu shadow p-3 mb-5 bg-body rounded"></div>
                  )}
                  {/* {showListContact === false && (
                    <input placeholder="Cari chat" className="inpt" />
                  )} */}
                  {showListContact === true && (
                    <input
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Cari kontak"
                      className="inpt"
                      autoFocus
                    />
                  )}
                  {showListContact === false && listRoomChat.length !== 0 && (
                    <div className="listChat justify-content-center">
                      {listRoomChat.map((e, index) => {
                        return (
                          <div className="listmap border-bottom border-2">
                            <div
                              onClick={() =>
                                RoomId({
                                  userId: e.userId,
                                  destinationId: e.destinationId,
                                  roomId: e.id,
                                  destinationName: e.destinationName,
                                  destination: e.destination,
                                  account: e.accounts,
                                })
                              }
                              className={
                                "listView d-flex " +
                                (e.id === roomId.myRoomId
                                  ? "blackBackground"
                                  : "")
                              }
                            >
                              <div>
                                {e.accounts.imageProfil !== "" && (
                                  <img
                                    src={e.accounts.imageProfil}
                                    width="50px"
                                    height="50px"
                                    alt=""
                                  />
                                )}
                                {e.accounts.imageProfil === "" && (
                                  <img
                                    src={avatar2}
                                    width="50px"
                                    height="50px"
                                    alt=""
                                  />
                                )}
                              </div>

                              <div className="name align-items-center">
                                {e.destinationName === "" && (
                                  <div className="nameAndTime d-flex justify-content-between">
                                    <p className="name1">{e.destination}</p>
                                    <p className="timeRoomChat">
                                      {e.chat[e.chat.length - 1].time}
                                    </p>
                                  </div>
                                )}

                                {e.destinationName !== "" && (
                                  <div className="nameAndTime d-flex justify-content-between">
                                    <p className="name1">{e.destinationName}</p>
                                    <p className="timeRoomChat">
                                      {e.chat[e.chat.length - 1].time}
                                    </p>
                                  </div>
                                )}

                                {(e.chat[e.chat.length - 1].type === "text" ||
                                  e.chat[e.chat.length - 1].type ===
                                    "forwardText-replyText" ||
                                  e.chat[e.chat.length - 1].type ===
                                    "forwardImage-replyText" ||
                                  e.chat[e.chat.length - 1].type ===
                                    "forwardEmoji-replyText" ||
                                  e.chat[e.chat.length - 1].type ===
                                    "forwardVideo-replyText" ||
                                  e.chat[e.chat.length - 1].type === "emoji" ||
                                  e.chat[e.chat.length - 1].type ===
                                    "forwardText-replyEmoji" ||
                                  e.chat[e.chat.length - 1].type ===
                                    "forwardEmoji-replyEmoji" ||
                                  e.chat[e.chat.length - 1].type ===
                                    "forwardImage-replyEmoji" ||
                                  e.chat[e.chat.length - 1].type === "" ||
                                  e.chat[e.chat.length - 1].type ===
                                    "forwardVideo-replyEmoji") && (
                                  <p className="pEdit textPreview">
                                    {e.chat[e.chat.length - 1].chat}
                                  </p>
                                )}
                                {(e.chat[e.chat.length - 1].type === "image" ||
                                  e.chat[e.chat.length - 1].type ===
                                    "forwardText-replyImage" ||
                                  e.chat[e.chat.length - 1].type ===
                                    "forwardEmoji-replyImage" ||
                                  e.chat[e.chat.length - 1].type ===
                                    "forwardImage-replyImage" ||
                                  e.chat[e.chat.length - 1].type ===
                                    "forwardVideo-replyImage") && (
                                  <p className="textPreview">
                                    <img
                                      className="imageTypeLastChat"
                                      src={camera}
                                      alt=""
                                      width="14px"
                                      height="13px"
                                    />
                                    {"  "}
                                    Foto
                                  </p>
                                )}
                                {(e.chat[e.chat.length - 1].type === "video" ||
                                  e.chat[e.chat.length - 1].type ===
                                    "forwardText-replyVideo" ||
                                  e.chat[e.chat.length - 1].type ===
                                    "forwardEmoji-replyVideo" ||
                                  e.chat[e.chat.length - 1].type ===
                                    "forwardImage-replyVideo" ||
                                  e.chat[e.chat.length - 1].type ===
                                    "forwardVideo-replyVideo") && (
                                  <p className="textPreview">
                                    <img
                                      className="imageTypeLastChat"
                                      src={iconVideo}
                                      alt=""
                                      width="14px"
                                      height="13px"
                                    />
                                    {"  "}
                                    Video
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {showListContact === false && listRoomChat.length === 0 && (
                    <div className="listChat justify-content-center">
                      <button
                        onClick={() => showContact(true)}
                        className="newChatIsEmpty"
                      >
                        Mulai chat baru
                      </button>
                    </div>
                  )}

                  {showListContact === true && <ListContact />}
                </div>
              </div>
            )}
            {showAddContact === true && (
              <div className="border-end border-2 col-4">
                <AddContact />
              </div>
            )}
            {roomId.destination !== "" && (
              <div className="chatView justify-content-center col-8">
                <div className="contactView d-flex justify-content-between border-bottom border-2 row">
                  <div
                    onClick={() => showContactProfil("contactProfil")}
                    className="avatarAndName d-flex justify-content-start align-items-center col-11 row"
                  >
                    {/* {listRoomChat
                      .filter((e) => e.destination === roomId.destination)
                      .map((val) => {
                        return (
                          <div className="col-1">
                            {roomId.account.imageProfil !== "" && (
                              <img
                                className="miniProfil"
                                src={roomId.account.imageProfil}
                                alt="avatar"
                              />
                            )}
                            {roomId.account.imageProfil === "" && (
                              <img
                                className="miniProfil"
                                src={avatar2}
                                alt="avatar"
                              />
                            )}
                          </div>
                        );
                      })} */}
                    <div className="col-1">
                      {roomId.account.imageProfil !== "" && (
                        <img
                          className="miniProfil"
                          src={roomId.account.imageProfil}
                          alt="avatar"
                        />
                      )}
                      {roomId.account.imageProfil === "" && (
                        <img
                          className="miniProfil"
                          src={avatar2}
                          alt="avatar"
                        />
                      )}
                    </div>
                    {roomId.destinationName !== "" && (
                      <p className="col-8">{roomId.destinationName}</p>
                    )}
                    {roomId.destinationName === "" && (
                      <p className="col-8">{roomId.destination}</p>
                    )}
                  </div>
                  <div className="searchChatButton d-flex justify-content-end align-items-center col-1">
                    {/* <img src={search} width="20px" alt="search" /> */}
                    <img
                      onClick={() => setChatSetting(true)}
                      src={menuIcon}
                      width="18px"
                      alt="search"
                    />
                  </div>
                </div>
                <div className={collapsChat}>
                  <AutoScroll>
                    {chats
                      .filter((val) => val.chat !== "")
                      .map((e, index) => {
                        return (
                          <div id={e.chat + e.timeStamp}>
                            {e.senderId !== roomId.userId && (
                              <div className="chatAndProfil d-flex justify-content-start">
                                <div
                                  onMouseOver={() => setOpenChatOpt(e.id)}
                                  onMouseOut={() => setOpenChatOpt("")}
                                  className={
                                    e.chat + e.timeStamp === param
                                      ? "darkBg content shadow-sm"
                                      : "content shadow-sm"
                                  }
                                >
                                  {e.type === "text" && (
                                    <p className="cht">{e.chat}</p>
                                  )}
                                  {e.type === "forwardText-replyText" && (
                                    <a
                                      onClick={() => setParam(e.forwardChatId)}
                                      href={"#" + e.forwardChatId}
                                    >
                                      <div className="contentForwardText">
                                        {localStorage.getItem("chatId") ===
                                          e.forwardSenderId && <p>Anda</p>}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName !== "" && (
                                            <p>{roomId.destinationName}</p>
                                          )}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName === "" && (
                                            <p>{roomId.destination}</p>
                                          )}
                                        <p className="">{e.forwardChat}</p>
                                      </div>
                                      <p className="cht">{e.chat}</p>
                                    </a>
                                  )}
                                  {e.type === "forwardText-replyEmoji" && (
                                    <a
                                      onClick={() => setParam(e.forwardChatId)}
                                      href={"#" + e.forwardChatId}
                                    >
                                      <div className="contentForwardText">
                                        {localStorage.getItem("chatId") ===
                                          e.forwardSenderId && <p>Anda</p>}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName !== "" && (
                                            <p>{roomId.destinationName}</p>
                                          )}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName === "" && (
                                            <p>{roomId.destination}</p>
                                          )}
                                        <p className="">{e.forwardChat}</p>
                                      </div>
                                      <p className="emot">{e.chat}</p>
                                    </a>
                                  )}
                                  {e.type === "forwardImage-replyText" && (
                                    <a
                                      onClick={() => setParam(e.forwardChatId)}
                                      href={"#" + e.forwardChatId}
                                    >
                                      <div className="contentForwardText d-flex justify-content-between align-items-center">
                                        <div>
                                          {localStorage.getItem("chatId") ===
                                            e.forwardSenderId && <p>Anda</p>}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName !== "" && (
                                              <p>{roomId.destinationName}</p>
                                            )}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName === "" && (
                                              <p>{roomId.destination}</p>
                                            )}
                                          <p>
                                            <img
                                              src={camera}
                                              width="14px"
                                              alt=""
                                            />
                                            Foto
                                          </p>
                                        </div>
                                        <img
                                          className="imageForward"
                                          src={e.forwardChat}
                                          alt=""
                                        />
                                      </div>
                                      <p className="cht">{e.chat}</p>
                                    </a>
                                  )}
                                  {e.type === "forwardVideo-replyText" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText d-flex justify-content-between align-items-center">
                                        <div>
                                          {localStorage.getItem("chatId") ===
                                            e.forwardSenderId && <p>Anda</p>}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName !== "" && (
                                              <p>{roomId.destinationName}</p>
                                            )}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName === "" && (
                                              <p>{roomId.destination}</p>
                                            )}
                                          <p>
                                            <img
                                              src={iconVideo}
                                              width="14px"
                                              alt=""
                                            />
                                            Video
                                          </p>
                                        </div>
                                        <video
                                          className="imageForward"
                                          src={e.forwardChat}
                                          alt=""
                                        />
                                      </div>
                                      <p className="cht">{e.chat}</p>
                                    </a>
                                  )}

                                  {e.type === "emoji" && (
                                    <p className="emot cht">{e.chat}</p>
                                  )}
                                  {e.type === "forwardEmoji-replyText" && (
                                    <a
                                      onClick={() => setParam(e.forwardChatId)}
                                      href={"#" + e.forwardChatId}
                                    >
                                      <div className="contentForwardText">
                                        {localStorage.getItem("chatId") ===
                                          e.forwardSenderId && <p>Anda</p>}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName !== "" && (
                                            <p>{roomId.destinationName}</p>
                                          )}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName === "" && (
                                            <p>{roomId.destination}</p>
                                          )}
                                        <p className="emot">{e.forwardChat}</p>
                                      </div>
                                      <p className="cht">{e.chat}</p>
                                    </a>
                                  )}
                                  {e.type === "forwardEmoji-replyEmoji" && (
                                    <a
                                      onClick={() => setParam(e.forwardChatId)}
                                      href={"#" + e.forwardChatId}
                                    >
                                      <div className="contentForwardText">
                                        {localStorage.getItem("chatId") ===
                                          e.forwardSenderId && <p>Anda</p>}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName !== "" && (
                                            <p>{roomId.destinationName}</p>
                                          )}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName === "" && (
                                            <p>{roomId.destination}</p>
                                          )}
                                        <p className="emot">{e.forwardChat}</p>
                                      </div>
                                      <p className="emot">{e.chat}</p>
                                    </a>
                                  )}
                                  {e.type === "forwardImage-replyEmoji" && (
                                    <a
                                      onClick={() => setParam(e.forwardChatId)}
                                      href={"#" + e.forwardChatId}
                                    >
                                      <div className="contentForwardText d-flex justify-content-between align-items-center">
                                        <div>
                                          {localStorage.getItem("chatId") ===
                                            e.forwardSenderId && <p>Anda</p>}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName !== "" && (
                                              <p>{roomId.destinationName}</p>
                                            )}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName === "" && (
                                              <p>{roomId.destination}</p>
                                            )}
                                          <p>
                                            <img
                                              src={camera}
                                              width="14px"
                                              alt=""
                                            />
                                            Foto
                                          </p>
                                        </div>
                                        <img
                                          className="imageForward"
                                          src={e.forwardChat}
                                          alt=""
                                        />
                                      </div>
                                      <p className="emot">{e.chat}</p>
                                    </a>
                                  )}
                                  {e.type === "forwardVideo-replyEmoji" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText d-flex justify-content-between align-items-center">
                                        <div>
                                          {localStorage.getItem("chatId") ===
                                            e.forwardSenderId && <p>Anda</p>}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName !== "" && (
                                              <p>{roomId.destinationName}</p>
                                            )}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName === "" && (
                                              <p>{roomId.destination}</p>
                                            )}
                                          <p>
                                            <img
                                              src={iconVideo}
                                              width="14px"
                                              alt=""
                                            />
                                            Video
                                          </p>
                                        </div>
                                        <video
                                          className="imageForward"
                                          src={e.forwardChat}
                                          alt=""
                                        />
                                      </div>
                                      <p className="emot">{e.chat}</p>
                                    </a>
                                  )}
                                  {e.type === "image" && (
                                    <img
                                      onClick={() => functionOpenImg(e.chat)}
                                      className="contentImg"
                                      src={e.chat}
                                      alt=""
                                    />
                                  )}
                                  {e.type === "forwardText-replyImage" && (
                                    <a
                                      onClick={() => setParam(e.forwardChatId)}
                                      href={"#" + e.forwardChatId}
                                    >
                                      <div className="contentForwardText">
                                        {localStorage.getItem("chatId") ===
                                          e.forwardSenderId && <p>Anda</p>}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName !== "" && (
                                            <p>{roomId.destinationName}</p>
                                          )}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName === "" && (
                                            <p>{roomId.destination}</p>
                                          )}
                                        <p>{e.forwardChat}</p>
                                      </div>
                                      <div className="imageField">
                                        <img
                                          onClick={() =>
                                            functionOpenImg(e.chat)
                                          }
                                          className="contentImg"
                                          src={e.chat}
                                          alt=""
                                        />
                                      </div>
                                    </a>
                                  )}

                                  {e.type === "forwardEmoji-replyImage" && (
                                    <a
                                      onClick={() => setParam(e.forwardChatId)}
                                      href={"#" + e.forwardChatId}
                                    >
                                      <div className="contentForwardText">
                                        {localStorage.getItem("chatId") ===
                                          e.forwardSenderId && <p>Anda</p>}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName !== "" && (
                                            <p>{roomId.destinationName}</p>
                                          )}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName === "" && (
                                            <p>{roomId.destination}</p>
                                          )}
                                        <p className="emot">{e.forwardChat}</p>
                                      </div>
                                      <div className="imageField">
                                        <img
                                          onClick={() =>
                                            functionOpenImg(e.chat)
                                          }
                                          className="contentImg"
                                          src={e.chat}
                                          alt=""
                                        />
                                      </div>
                                    </a>
                                  )}

                                  {e.type === "forwardImage-replyImage" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText d-flex justify-content-between align-items-center">
                                        <div>
                                          {localStorage.getItem("chatId") ===
                                            e.forwardSenderId && <p>Anda</p>}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName !== "" && (
                                              <p>{roomId.destinationName}</p>
                                            )}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName === "" && (
                                              <p>{roomId.destination}</p>
                                            )}
                                          <p>
                                            <img
                                              src={camera}
                                              width="14px"
                                              alt=""
                                            />
                                            Foto
                                          </p>
                                        </div>
                                        <img
                                          className="imageForward"
                                          src={e.forwardChat}
                                          alt=""
                                        />
                                      </div>
                                      <div className="imageField">
                                        <img
                                          onClick={() =>
                                            functionOpenImg(e.chat)
                                          }
                                          className="contentImg"
                                          src={e.chat}
                                          alt=""
                                        />
                                      </div>
                                    </a>
                                  )}
                                  {e.type === "forwardVideo-replyImage" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText d-flex justify-content-between align-items-center">
                                        <div>
                                          {localStorage.getItem("chatId") ===
                                            e.forwardSenderId && <p>Anda</p>}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName !== "" && (
                                              <p>{roomId.destinationName}</p>
                                            )}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName === "" && (
                                              <p>{roomId.destination}</p>
                                            )}
                                          <p>
                                            <img
                                              src={iconVideo}
                                              width="14px"
                                              alt=""
                                            />
                                            Video
                                          </p>
                                        </div>
                                        <video
                                          className="imageForward"
                                          src={e.forwardChat}
                                          alt=""
                                        />
                                      </div>
                                      <div className="imageField">
                                        <img
                                          onClick={() =>
                                            functionOpenImg(e.chat)
                                          }
                                          className="contentImg"
                                          src={e.chat}
                                          alt=""
                                        />
                                      </div>
                                    </a>
                                  )}
                                  {e.type === "video" && (
                                    <div
                                      className="play"
                                      onClick={() => functionOpenVideo(e.chat)}
                                    >
                                      <video
                                        className="contentImg"
                                        src={e.chat}
                                      />
                                      <img src={play} alt="" width="60px" />
                                    </div>
                                  )}
                                  {e.type === "forwardText-replyVideo" && (
                                    <a
                                      onClick={() => setParam(e.forwardChatId)}
                                      href={"#" + e.forwardChatId}
                                    >
                                      <div className="contentForwardText">
                                        {localStorage.getItem("chatId") ===
                                          e.forwardSenderId && <p>Anda</p>}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName !== "" && (
                                            <p>{roomId.destinationName}</p>
                                          )}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName === "" && (
                                            <p>{roomId.destination}</p>
                                          )}
                                        <p>{e.forwardChat}</p>
                                      </div>
                                      <div className="imageField">
                                        <div
                                          className="play"
                                          onClick={() =>
                                            functionOpenVideo(e.chat)
                                          }
                                        >
                                          <video
                                            className="contentImg"
                                            src={e.chat}
                                          />
                                          <img src={play} alt="" width="60px" />
                                        </div>
                                      </div>
                                    </a>
                                  )}
                                  {e.type === "forwardEmoji-replyVideo" && (
                                    <a
                                      onClick={() => setParam(e.forwardChatId)}
                                      href={"#" + e.forwardChatId}
                                    >
                                      <div className="contentForwardText">
                                        {localStorage.getItem("chatId") ===
                                          e.forwardSenderId && <p>Anda</p>}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName !== "" && (
                                            <p>{roomId.destinationName}</p>
                                          )}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName === "" && (
                                            <p>{roomId.destination}</p>
                                          )}
                                        <p className="emot">{e.forwardChat}</p>
                                      </div>
                                      <div className="imageField">
                                        <div
                                          className="play"
                                          onClick={() =>
                                            functionOpenVideo(e.chat)
                                          }
                                        >
                                          <video
                                            className="contentImg"
                                            src={e.chat}
                                          />
                                          <img src={play} alt="" width="60px" />
                                        </div>
                                      </div>
                                    </a>
                                  )}
                                  {e.type === "forwardImage-replyVideo" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText d-flex justify-content-between align-items-center">
                                        <div>
                                          {localStorage.getItem("chatId") ===
                                            e.forwardSenderId && <p>Anda</p>}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName !== "" && (
                                              <p>{roomId.destinationName}</p>
                                            )}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName === "" && (
                                              <p>{roomId.destination}</p>
                                            )}
                                          <p>
                                            <img
                                              src={camera}
                                              width="14px"
                                              alt=""
                                            />
                                            Foto
                                          </p>
                                        </div>
                                        <img
                                          className="imageForward"
                                          src={e.forwardChat}
                                          alt=""
                                        />
                                      </div>
                                      <div className="imageField">
                                        <div
                                          className="play"
                                          onClick={() =>
                                            functionOpenVideo(e.chat)
                                          }
                                        >
                                          <video
                                            className="contentImg"
                                            src={e.chat}
                                          />
                                          <img src={play} alt="" width="60px" />
                                        </div>
                                      </div>
                                    </a>
                                  )}
                                  {e.type === "forwardVideo-replyVideo" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText d-flex justify-content-between align-items-center">
                                        <div>
                                          {localStorage.getItem("chatId") ===
                                            e.forwardSenderId && <p>Anda</p>}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName !== "" && (
                                              <p>{roomId.destinationName}</p>
                                            )}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName === "" && (
                                              <p>{roomId.destination}</p>
                                            )}
                                          <p>
                                            <img
                                              src={iconVideo}
                                              width="14px"
                                              alt=""
                                            />
                                            Video
                                          </p>
                                        </div>
                                        <video
                                          className="imageForward"
                                          src={e.forwardChat}
                                          alt=""
                                        />
                                      </div>
                                      <div className="imageField">
                                        <div
                                          className="play"
                                          onClick={() =>
                                            functionOpenVideo(e.chat)
                                          }
                                        >
                                          <video
                                            className="contentImg"
                                            src={e.chat}
                                          />
                                          <img src={play} alt="" width="60px" />
                                        </div>
                                      </div>
                                    </a>
                                  )}
                                  {openChatOpt !== e.id && chatOpt !== e.id && (
                                    <div className="timeAndStatus d-flex justify-content-end">
                                      <p className="time">{e.time}</p>
                                    </div>
                                  )}
                                  {openChatOpt === e.id && chatOpt !== e.id && (
                                    <div className="timeAndStatus d-flex justify-content-end">
                                      <img
                                        onClick={() => setChatOpt(e.id)}
                                        className="downArrow"
                                        src={downArrow2}
                                        alt="check"
                                        width="15px"
                                        height="13px"
                                      />
                                    </div>
                                  )}
                                  {chatOpt === e.id && (
                                    <div className="d-flex justify-content-center optChat">
                                      <p
                                        onClick={() =>
                                          openForward({
                                            name: roomId.destinationName,
                                            chat: e.chat,
                                            type: e.type,
                                            forwardSenderId: e.senderId,
                                            forwardChatId: e.chat + e.timeStamp,
                                          })
                                        }
                                      >
                                        Balas
                                      </p>
                                      <p
                                        onClick={() =>
                                          confirmDelChat({
                                            userId:
                                              localStorage.getItem("chatId"),
                                            roomId: e.receiverRoomId,
                                            chatId: e.id,
                                            chat: chats,
                                          })
                                        }
                                      >
                                        Hapus
                                      </p>
                                      <p onClick={() => setChatOpt(false)}>
                                        Batal
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            {e.senderId === roomId.userId && (
                              <div className="chatAndProfil d-flex justify-content-end">
                                <div
                                  onMouseOver={() => setOpenChatOpt(e.id)}
                                  onMouseOut={() => setOpenChatOpt("")}
                                  className={
                                    e.chat + e.timeStamp === param
                                      ? "darkBg2 myRoom content shadow-sm"
                                      : "blueBg myRoom content shadow-sm"
                                  }
                                >
                                  {e.type === "text" && (
                                    <p className="cht">{e.chat}</p>
                                  )}
                                  {e.type === "forwardText-replyText" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText">
                                        {localStorage.getItem("chatId") ===
                                          e.forwardSenderId && <p>Anda</p>}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName !== "" && (
                                            <p>{roomId.destinationName}</p>
                                          )}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName === "" && (
                                            <p>{roomId.destination}</p>
                                          )}
                                        <p className="">{e.forwardChat}</p>
                                      </div>
                                      <p className="cht">{e.chat}</p>
                                    </a>
                                  )}
                                  {e.type === "forwardText-replyEmoji" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText">
                                        {localStorage.getItem("chatId") ===
                                          e.forwardSenderId && <p>Anda</p>}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName !== "" && (
                                            <p>{roomId.destinationName}</p>
                                          )}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName === "" && (
                                            <p>{roomId.destination}</p>
                                          )}
                                        <p className="">{e.forwardChat}</p>
                                      </div>
                                      <p className="emot">{e.chat}</p>
                                    </a>
                                  )}
                                  {e.type === "forwardImage-replyText" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText d-flex justify-content-between align-items-center">
                                        <div>
                                          {localStorage.getItem("chatId") ===
                                            e.forwardSenderId && <p>Anda</p>}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName !== "" && (
                                              <p>{roomId.destinationName}</p>
                                            )}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName === "" && (
                                              <p>{roomId.destination}</p>
                                            )}
                                          <p>
                                            <img
                                              src={camera}
                                              width="14px"
                                              alt=""
                                            />
                                            Foto
                                          </p>
                                        </div>
                                        <img
                                          className="imageForward"
                                          src={e.forwardChat}
                                          alt=""
                                        />
                                      </div>
                                      <p className="cht">{e.chat}</p>
                                    </a>
                                  )}
                                  {e.type === "forwardVideo-replyText" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText d-flex justify-content-between align-items-center">
                                        <div>
                                          {localStorage.getItem("chatId") ===
                                            e.forwardSenderId && <p>Anda</p>}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName !== "" && (
                                              <p>{roomId.destinationName}</p>
                                            )}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName === "" && (
                                              <p>{roomId.destination}</p>
                                            )}
                                          <p>
                                            <img
                                              src={iconVideo}
                                              width="14px"
                                              alt=""
                                            />
                                            Video
                                          </p>
                                        </div>
                                        <video
                                          className="imageForward"
                                          src={e.forwardChat}
                                          alt=""
                                        />
                                      </div>
                                      <p className="cht">{e.chat}</p>
                                    </a>
                                  )}
                                  {e.type === "emoji" && (
                                    <p className="emot cht">{e.chat}</p>
                                  )}
                                  {e.type === "forwardEmoji-replyText" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText">
                                        {localStorage.getItem("chatId") ===
                                          e.forwardSenderId && <p>Anda</p>}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName !== "" && (
                                            <p>{roomId.destinationName}</p>
                                          )}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName === "" && (
                                            <p>{roomId.destination}</p>
                                          )}
                                        <p className="emot">{e.forwardChat}</p>
                                      </div>
                                      <p className="cht">{e.chat}</p>
                                    </a>
                                  )}
                                  {e.type === "forwardEmoji-replyEmoji" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText">
                                        {localStorage.getItem("chatId") ===
                                          e.forwardSenderId && <p>Anda</p>}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName !== "" && (
                                            <p>{roomId.destinationName}</p>
                                          )}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName === "" && (
                                            <p>{roomId.destination}</p>
                                          )}
                                        <p className="emot">{e.forwardChat}</p>
                                      </div>
                                      <p className="emot">{e.chat}</p>
                                    </a>
                                  )}
                                  {e.type === "forwardImage-replyEmoji" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText d-flex justify-content-between align-items-center">
                                        <div>
                                          {localStorage.getItem("chatId") ===
                                            e.forwardSenderId && <p>Anda</p>}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName !== "" && (
                                              <p>{roomId.destinationName}</p>
                                            )}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName === "" && (
                                              <p>{roomId.destination}</p>
                                            )}
                                          <p>
                                            <img
                                              src={camera}
                                              width="14px"
                                              alt=""
                                            />
                                            Foto
                                          </p>
                                        </div>
                                        <img
                                          className="imageForward"
                                          src={e.forwardChat}
                                          alt=""
                                        />
                                      </div>
                                      <p className="emot">{e.chat}</p>
                                    </a>
                                  )}
                                  {e.type === "forwardVideo-replyEmoji" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText d-flex justify-content-between align-items-center">
                                        <div>
                                          {localStorage.getItem("chatId") ===
                                            e.forwardSenderId && <p>Anda</p>}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName !== "" && (
                                              <p>{roomId.destinationName}</p>
                                            )}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName === "" && (
                                              <p>{roomId.destination}</p>
                                            )}
                                          <p>
                                            <img
                                              src={iconVideo}
                                              width="14px"
                                              alt=""
                                            />
                                            Video
                                          </p>
                                        </div>
                                        <video
                                          className="imageForward"
                                          src={e.forwardChat}
                                          alt=""
                                        />
                                      </div>
                                      <p className="emot">{e.chat}</p>
                                    </a>
                                  )}
                                  {e.type === "image" && (
                                    <img
                                      onClick={() => functionOpenImg(e.chat)}
                                      className="contentImg"
                                      src={e.chat}
                                      alt=""
                                    />
                                  )}
                                  {e.type === "forwardText-replyImage" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText">
                                        {localStorage.getItem("chatId") ===
                                          e.forwardSenderId && <p>Anda</p>}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName !== "" && (
                                            <p>{roomId.destinationName}</p>
                                          )}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName === "" && (
                                            <p>{roomId.destination}</p>
                                          )}
                                        <p className="">{e.forwardChat}</p>
                                      </div>
                                      <div className="imageField">
                                        <img
                                          onClick={() =>
                                            functionOpenImg(e.chat)
                                          }
                                          className="contentImg"
                                          src={e.chat}
                                          alt=""
                                        />
                                      </div>
                                    </a>
                                  )}
                                  {e.type === "forwardEmoji-replyImage" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText">
                                        {localStorage.getItem("chatId") ===
                                          e.forwardSenderId && <p>Anda</p>}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName !== "" && (
                                            <p>{roomId.destinationName}</p>
                                          )}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName === "" && (
                                            <p>{roomId.destination}</p>
                                          )}
                                        <p className="emot">{e.forwardChat}</p>
                                      </div>
                                      <div className="imageField">
                                        <img
                                          onClick={() =>
                                            functionOpenImg(e.chat)
                                          }
                                          className="contentImg"
                                          src={e.chat}
                                          alt=""
                                        />
                                      </div>
                                    </a>
                                  )}
                                  {e.type === "forwardImage-replyImage" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText d-flex justify-content-between align-items-center">
                                        <div>
                                          {localStorage.getItem("chatId") ===
                                            e.forwardSenderId && <p>Anda</p>}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName !== "" && (
                                              <p>{roomId.destinationName}</p>
                                            )}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName === "" && (
                                              <p>{roomId.destination}</p>
                                            )}
                                          <p>
                                            <img
                                              src={camera}
                                              width="14px"
                                              alt=""
                                            />
                                            Foto
                                          </p>
                                        </div>
                                        <img
                                          className="imageForward"
                                          src={e.forwardChat}
                                          alt=""
                                        />
                                      </div>
                                      <div className="imageField">
                                        <img
                                          onClick={() =>
                                            functionOpenImg(e.chat)
                                          }
                                          className="contentImg"
                                          src={e.chat}
                                          alt=""
                                        />
                                      </div>
                                    </a>
                                  )}
                                  {e.type === "forwardVideo-replyImage" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText d-flex justify-content-between align-items-center">
                                        <div>
                                          {localStorage.getItem("chatId") ===
                                            e.forwardSenderId && <p>Anda</p>}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName !== "" && (
                                              <p>{roomId.destinationName}</p>
                                            )}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName === "" && (
                                              <p>{roomId.destination}</p>
                                            )}
                                          <p>
                                            <img
                                              src={iconVideo}
                                              width="14px"
                                              alt=""
                                            />
                                            Video
                                          </p>
                                        </div>
                                        <video
                                          className="imageForward"
                                          src={e.forwardChat}
                                          alt=""
                                        />
                                      </div>
                                      <div className="imageField">
                                        <img
                                          onClick={() =>
                                            functionOpenImg(e.chat)
                                          }
                                          className="contentImg"
                                          src={e.chat}
                                          alt=""
                                        />
                                      </div>
                                    </a>
                                  )}
                                  {e.type === "video" && (
                                    <div
                                      className="play"
                                      onClick={() => functionOpenVideo(e.chat)}
                                    >
                                      <video
                                        className="contentImg"
                                        src={e.chat}
                                      />
                                      <img src={play} alt="" width="60px" />
                                    </div>
                                  )}
                                  {e.type === "forwardText-replyVideo" && (
                                    <a
                                      onClick={() => setParam(e.forwardChatId)}
                                      href={"#" + e.forwardChatId}
                                    >
                                      <div className="contentForwardText">
                                        {localStorage.getItem("chatId") ===
                                          e.forwardSenderId && <p>Anda</p>}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName !== "" && (
                                            <p>{roomId.destinationName}</p>
                                          )}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName === "" && (
                                            <p>{roomId.destination}</p>
                                          )}
                                        <p>{e.forwardChat}</p>
                                      </div>
                                      <div className="imageField">
                                        <div
                                          className="play"
                                          onClick={() =>
                                            functionOpenVideo(e.chat)
                                          }
                                        >
                                          <video
                                            className="contentImg"
                                            src={e.chat}
                                          />
                                          <img src={play} alt="" width="60px" />
                                        </div>
                                      </div>
                                    </a>
                                  )}
                                  {e.type === "forwardEmoji-replyVideo" && (
                                    <a
                                      onClick={() => setParam(e.forwardChatId)}
                                      href={"#" + e.forwardChatId}
                                    >
                                      <div className="contentForwardText">
                                        {localStorage.getItem("chatId") ===
                                          e.forwardSenderId && <p>Anda</p>}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName !== "" && (
                                            <p>{roomId.destinationName}</p>
                                          )}
                                        {localStorage.getItem("chatId") !==
                                          e.forwardSenderId &&
                                          roomId.destinationName === "" && (
                                            <p>{roomId.destination}</p>
                                          )}
                                        <p className="emot">{e.forwardChat}</p>
                                      </div>
                                      <div className="imageField">
                                        <div
                                          className="play"
                                          onClick={() =>
                                            functionOpenVideo(e.chat)
                                          }
                                        >
                                          <video
                                            className="contentImg"
                                            src={e.chat}
                                          />
                                          <img src={play} alt="" width="60px" />
                                        </div>
                                      </div>
                                    </a>
                                  )}
                                  {e.type === "forwardImage-replyVideo" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText d-flex justify-content-between align-items-center">
                                        <div>
                                          {localStorage.getItem("chatId") ===
                                            e.forwardSenderId && <p>Anda</p>}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName !== "" && (
                                              <p>{roomId.destinationName}</p>
                                            )}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName === "" && (
                                              <p>{roomId.destination}</p>
                                            )}
                                          <p>
                                            <img
                                              src={camera}
                                              width="14px"
                                              alt=""
                                            />
                                            Foto
                                          </p>
                                        </div>
                                        <img
                                          className="imageForward"
                                          src={e.forwardChat}
                                          alt=""
                                        />
                                      </div>
                                      <div className="imageField">
                                        <div
                                          className="play"
                                          onClick={() =>
                                            functionOpenVideo(e.chat)
                                          }
                                        >
                                          <video
                                            className="contentImg"
                                            src={e.chat}
                                          />
                                          <img src={play} alt="" width="60px" />
                                        </div>
                                      </div>
                                    </a>
                                  )}
                                  {e.type === "forwardVideo-replyVideo" && (
                                    <a
                                      href={"#" + e.forwardChatId}
                                      onClick={() => setParam(e.forwardChatId)}
                                    >
                                      <div className="contentForwardText d-flex justify-content-between align-items-center">
                                        <div>
                                          {localStorage.getItem("chatId") ===
                                            e.forwardSenderId && <p>Anda</p>}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName !== "" && (
                                              <p>{roomId.destinationName}</p>
                                            )}
                                          {localStorage.getItem("chatId") !==
                                            e.forwardSenderId &&
                                            roomId.destinationName === "" && (
                                              <p>{roomId.destination}</p>
                                            )}
                                          <p>
                                            <img
                                              src={iconVideo}
                                              width="14px"
                                              alt=""
                                            />
                                            Video
                                          </p>
                                        </div>
                                        <video
                                          className="imageForward"
                                          src={e.forwardChat}
                                          alt=""
                                        />
                                      </div>
                                      <div className="imageField">
                                        <div
                                          className="play"
                                          onClick={() =>
                                            functionOpenVideo(e.chat)
                                          }
                                        >
                                          <video
                                            className="contentImg"
                                            src={e.chat}
                                          />
                                          <img src={play} alt="" width="60px" />
                                        </div>
                                      </div>
                                    </a>
                                  )}
                                  {openChatOpt !== e.id && chatOpt !== e.id && (
                                    <div className="timeAndStatus d-flex justify-content-end">
                                      <p className="time">{e.time}</p>
                                      {e.status === "send" && (
                                        <img
                                          src={check2}
                                          alt="check"
                                          width="15px"
                                          height="13px"
                                        />
                                      )}
                                      {e.status === "read" && (
                                        <img
                                          src={check1}
                                          alt="check"
                                          width="15px"
                                          height="13px"
                                        />
                                      )}
                                    </div>
                                  )}
                                  {openChatOpt === e.id && chatOpt !== e.id && (
                                    <div className="timeAndStatus d-flex justify-content-end">
                                      <img
                                        onClick={() => setChatOpt(e.id)}
                                        className="downArrow"
                                        src={downArrow}
                                        alt="check"
                                        width="15px"
                                        height="13px"
                                      />
                                    </div>
                                  )}
                                  {chatOpt === e.id && (
                                    <div className="d-flex justify-content-center optChat">
                                      <p
                                        onClick={() =>
                                          openForward({
                                            name: "Anda",
                                            chat: e.chat,
                                            type: e.type,
                                            forwardSenderId: e.senderId,
                                            forwardChatId: e.chat + e.timeStamp,
                                          })
                                        }
                                      >
                                        Balas
                                      </p>
                                      <p
                                        onClick={() =>
                                          confirmDelChat({
                                            userId:
                                              localStorage.getItem("chatId"),
                                            roomId: e.senderRoomId,
                                            chatId: e.id,
                                            chat: chats,
                                          })
                                        }
                                      >
                                        Hapus
                                      </p>
                                      <p onClick={() => setChatOpt(false)}>
                                        Batal
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    {contentImageLoading === true && (
                      <div className="chatAndProfil d-flex justify-content-end">
                        <div className="blueBg myRoom content shadow-sm">
                          {" "}
                          <div
                            className="contentImg d-flex justify-content-center align-items-center"
                            src=""
                            alt=""
                          >
                            <div
                              class="spinner-border text-light"
                              role="status"
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          </div>
                          <p className="text-center progresText">
                            {progressImage} %
                          </p>
                        </div>
                      </div>
                    )}
                  </AutoScroll>
                </div>

                {forwardChat === true && (
                  <div className="forwardInput shadow-sm d-flex align-items-center">
                    {(forwardMessage.type === "text" ||
                      forwardMessage.type === "forwardText-replyText" ||
                      forwardMessage.type === "forwardImage-replyText" ||
                      forwardMessage.type === "forwardEmoji-replyText" ||
                      forwardMessage.type === "forwardVideo-replyText") && (
                      <div className="contentForward">
                        {forwardMessage.name !== "" && (
                          <p className="forwardName">
                            <b>{forwardMessage.name}</b>
                          </p>
                        )}
                        {forwardMessage.name === "" && (
                          <p className="forwardName">
                            <b>{roomId.destination}</b>
                          </p>
                        )}
                        <p className="forwardtext">{forwardMessage.chat}</p>
                      </div>
                    )}
                    {(forwardMessage.type === "emoji" ||
                      forwardMessage.type === "forwardText-replyEmoji" ||
                      forwardMessage.type === "forwardEmoji-replyEmoji" ||
                      forwardMessage.type === "forwardImage-replyEmoji" ||
                      forwardMessage.type === "forwardVideo-replyEmoji") && (
                      <div className="contentForward">
                        {forwardMessage.name !== "" && (
                          <p className="forwardName">
                            <b>{forwardMessage.name}</b>
                          </p>
                        )}
                        {forwardMessage.name === "" && (
                          <p className="forwardName">
                            <b>{roomId.destination}</b>
                          </p>
                        )}
                        <p className="emtForward forwardtext">
                          {forwardMessage.chat}
                        </p>
                      </div>
                    )}
                    {(forwardMessage.type === "image" ||
                      forwardMessage.type === "forwardText-replyImage" ||
                      forwardMessage.type === "forwardEmoji-replyImage" ||
                      forwardMessage.type === "forwardImage-replyImage" ||
                      forwardMessage.type === "forwardVideo-replyImage") && (
                      <div className="contentForward d-flex justify-content-between align-items-center">
                        <div>
                          {forwardMessage.name !== "" && (
                            <p className="forwardName">
                              <b>{forwardMessage.name}</b>
                            </p>
                          )}
                          {forwardMessage.name === "" && (
                            <p className="forwardName">
                              <b>{roomId.destination}</b>
                            </p>
                          )}
                          <img
                            className="cameraImg"
                            src={camera}
                            alt=""
                            width="14px"
                          />
                          <span className="forwardtext">Foto</span>
                        </div>
                        <div>
                          <img
                            className="forwardImg"
                            src={forwardMessage.chat}
                            alt=""
                          />
                        </div>
                      </div>
                    )}
                    {(forwardMessage.type === "video" ||
                      forwardMessage.type === "forwardText-replyVideo" ||
                      forwardMessage.type === "forwardEmoji-replyVideo" ||
                      forwardMessage.type === "forwardImage-replyVideo" ||
                      forwardMessage.type === "forwardVideo-replyVideo") && (
                      <div className="contentForward d-flex justify-content-between align-items-center">
                        <div>
                          {forwardMessage.name !== "" && (
                            <p className="forwardName">
                              <b>{forwardMessage.name}</b>
                            </p>
                          )}
                          {forwardMessage.name === "" && (
                            <p className="forwardName">
                              <b>{roomId.destination}</b>
                            </p>
                          )}
                          <img
                            className="cameraImg"
                            src={iconVideo}
                            alt=""
                            width="14px"
                          />
                          <span className="forwardtext">Video</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <video
                            className="forwardImg"
                            src={forwardMessage.chat}
                            alt=""
                          />
                        </div>
                      </div>
                    )}
                    {openEmoji === false && (
                      <img
                        onClick={() => closeForwardChat1()}
                        className="closeForward"
                        src={close2}
                        width="18px"
                        alt=""
                      />
                    )}
                    {openEmoji === true && (
                      <img
                        onClick={() => closeForwardChat2()}
                        className="closeForward"
                        src={close2}
                        width="18px"
                        alt=""
                      />
                    )}
                  </div>
                )}
                {openEmoji === true && (
                  <div className="emojies shadow-sm d-flex justify-content-center align-items-center">
                    {forwardChat === false && (
                      <div className="emojiBox row d-flex justify-content-center">
                        {Emoji.map((e) => {
                          return (
                            <p
                              onClick={() =>
                                Send({
                                  chat: e.emoji,
                                  userId: roomId.userId,
                                  destinationId: roomId.destinationUserId,
                                  myRoomId: roomId.myRoomId,
                                  type: "emoji",
                                  destinationRoomId: roomId.destinationRoomId,
                                  time: moment().format("HH:mm"),
                                  timeStamp: moment().format("YYYYMMDDhhmmss"),
                                  forwardChat: "",
                                  forwardName: "",
                                  forwardSenderId: "",
                                  forwardChatId: "",
                                })
                              }
                              className="col"
                            >
                              {e.emoji}
                            </p>
                          );
                        })}
                      </div>
                    )}
                    {forwardChat === true &&
                      (forwardMessage.type === "image" ||
                        forwardMessage.type === "forwardEmoji-replyImage" ||
                        forwardMessage.type === "forwardText-replyImage" ||
                        forwardMessage.type === "forwardImage-replyImage" ||
                        forwardMessage.type === "forwardVideo-replyImage") && (
                        <div className="emojiBox row d-flex justify-content-center">
                          {Emoji.map((e) => {
                            return (
                              <p
                                onClick={() =>
                                  Send({
                                    chat: e.emoji,
                                    userId: roomId.userId,
                                    destinationId: roomId.destinationUserId,
                                    myRoomId: roomId.myRoomId,
                                    type: "forwardImage-replyEmoji",
                                    destinationRoomId: roomId.destinationRoomId,
                                    time: moment().format("HH:mm"),
                                    timeStamp:
                                      moment().format("YYYYMMDDhhmmss"),
                                    forwardChat: forwardMessage.chat,
                                    forwardName: forwardMessage.name,
                                    forwardSenderId:
                                      forwardMessage.forwardSenderId,
                                    forwardChatId: forwardMessage.forwardChatId,
                                  })
                                }
                                className="col"
                              >
                                {e.emoji}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    {forwardChat === true &&
                      (forwardMessage.type === "text" ||
                        forwardMessage.type === "forwardText-replyText" ||
                        forwardMessage.type === "forwardEmoji-replyText" ||
                        forwardMessage.type === "forwardImage-replyText" ||
                        forwardMessage.type === "forwardVideo-replyText") && (
                        <div className="emojiBox row d-flex justify-content-center">
                          {Emoji.map((e) => {
                            console.log(forwardMessage.type);
                            return (
                              <p
                                onClick={() =>
                                  Send({
                                    chat: e.emoji,
                                    userId: roomId.userId,
                                    destinationId: roomId.destinationUserId,
                                    myRoomId: roomId.myRoomId,
                                    type: "forwardText-replyEmoji",
                                    destinationRoomId: roomId.destinationRoomId,
                                    time: moment().format("HH:mm"),
                                    timeStamp:
                                      moment().format("YYYYMMDDhhmmss"),
                                    forwardChat: forwardMessage.chat,
                                    forwardName: forwardMessage.name,
                                    forwardSenderId:
                                      forwardMessage.forwardSenderId,
                                    forwardChatId: forwardMessage.forwardChatId,
                                  })
                                }
                                className="col"
                              >
                                {e.emoji}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    {forwardChat === true &&
                      (forwardMessage.type === "emoji" ||
                        forwardMessage.type === "forwardEmoji-replyEmoji" ||
                        forwardMessage.type === "forwardText-replyEmoji" ||
                        forwardMessage.type === "forwardImage-replyEmoji" ||
                        forwardMessage.type === "forwardVideo-replyEmoji") && (
                        <div className="emojiBox row d-flex justify-content-center">
                          {Emoji.map((e) => {
                            return (
                              <p
                                onClick={() =>
                                  Send({
                                    chat: e.emoji,
                                    userId: roomId.userId,
                                    destinationId: roomId.destinationUserId,
                                    myRoomId: roomId.myRoomId,
                                    type: "forwardEmoji-replyEmoji",
                                    destinationRoomId: roomId.destinationRoomId,
                                    time: moment().format("HH:mm"),
                                    timeStamp:
                                      moment().format("YYYYMMDDhhmmss"),
                                    forwardChat: forwardMessage.chat,
                                    forwardName: forwardMessage.name,
                                    forwardSenderId:
                                      forwardMessage.forwardSenderId,
                                    forwardChatId: forwardMessage.forwardChatId,
                                  })
                                }
                                className="col"
                              >
                                {e.emoji}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    {forwardChat === true &&
                      (forwardMessage.type === "video" ||
                        forwardMessage.type === "forwardEmoji-replyVideo" ||
                        forwardMessage.type === "forwardText-replyVideo" ||
                        forwardMessage.type === "forwardImage-replyVideo" ||
                        forwardMessage.type === "forwardVideo-replyVideo") && (
                        <div className="emojiBox row d-flex justify-content-center">
                          {Emoji.map((e) => {
                            return (
                              <p
                                onClick={() =>
                                  Send({
                                    chat: e.emoji,
                                    userId: roomId.userId,
                                    destinationId: roomId.destinationUserId,
                                    myRoomId: roomId.myRoomId,
                                    type: "forwardVideo-replyEmoji",
                                    destinationRoomId: roomId.destinationRoomId,
                                    time: moment().format("HH:mm"),
                                    timeStamp:
                                      moment().format("YYYYMMDDhhmmss"),
                                    forwardChat: forwardMessage.chat,
                                    forwardName: forwardMessage.name,
                                    forwardSenderId:
                                      forwardMessage.forwardSenderId,
                                    forwardChatId: forwardMessage.forwardChatId,
                                  })
                                }
                                className="col"
                              >
                                {e.emoji}
                              </p>
                            );
                          })}
                        </div>
                      )}
                  </div>
                )}
                <div className="inputChat d-flex align-items-center shadow-sm">
                  {openEmoji === false && forwardChat === false && (
                    <img
                      onClick={() => OpenEmoji1()}
                      className="emoji"
                      src={emoji}
                      width="30px"
                      height="30px"
                      alt="emotIcon"
                    />
                  )}
                  {openEmoji === false && forwardChat === true && (
                    <img
                      onClick={() => OpenEmoji2()}
                      className="emoji"
                      src={emoji}
                      width="30px"
                      height="30px"
                      alt="emotIcon"
                    />
                  )}
                  {openEmoji === true && forwardChat === false && (
                    <img
                      onClick={() => CloseEmoji1()}
                      className="closeEmoji emoji"
                      src={close2}
                      width="30px"
                      height="30px"
                      alt="emotIcon"
                    />
                  )}
                  {openEmoji === true && forwardChat === true && (
                    <img
                      onClick={() => CloseEmoji2()}
                      className="closeEmoji emoji"
                      src={close2}
                      width="30px"
                      height="30px"
                      alt="emotIcon"
                    />
                  )}
                  <label for="addimgChat">
                    <img
                      className="addImgChat"
                      src={addPhoto}
                      width="30px"
                      height="30px"
                      alt="emotIcon"
                    />
                  </label>
                  {forwardChat === false && (
                    <input
                      className="display-none"
                      type="file"
                      id="addimgChat"
                      accept="image/x-png,image/gif,image/jpeg"
                      onChange={(val) =>
                        sendImage({
                          file: val.target.files[0],
                          userId: roomId.userId,
                          destinationId: roomId.destinationUserId,
                          myRoomId: roomId.myRoomId,
                          type: "image",
                          destinationRoomId: roomId.destinationRoomId,
                          time: moment().format("HH:mm"),
                          timeStamp: moment().format("YYYYMMDDhhmmss"),
                          forwardChat: "",
                          forwardName: "",
                          forwardSenderId: "",
                          forwardChatId: "",
                        })
                      }
                    />
                  )}
                  {forwardChat === true &&
                    (forwardMessage.type === "text" ||
                      forwardMessage.type === "forwardText-replyText" ||
                      forwardMessage.type === "forwardEmoji-replyText" ||
                      forwardMessage.type === "forwardImage-replyText" ||
                      forwardMessage.type === "forwardVideo-replyText") && (
                      <input
                        className="display-none"
                        type="file"
                        id="addimgChat"
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange={(val) =>
                          sendImage({
                            file: val.target.files[0],
                            userId: roomId.userId,
                            destinationId: roomId.destinationUserId,
                            myRoomId: roomId.myRoomId,
                            type: "forwardText-replyImage",
                            destinationRoomId: roomId.destinationRoomId,
                            time: moment().format("HH:mm"),
                            timeStamp: moment().format("YYYYMMDDhhmmss"),
                            forwardChat: forwardMessage.chat,
                            forwardName: forwardMessage.name,
                            forwardSenderId: forwardMessage.forwardSenderId,
                            forwardChatId: forwardMessage.forwardChatId,
                          })
                        }
                      />
                    )}
                  {forwardChat === true &&
                    (forwardMessage.type === "emoji" ||
                      forwardMessage.type === "forwardText-replyEmoji" ||
                      forwardMessage.type === "forwardEmoji-replyEmoji" ||
                      forwardMessage.type === "forwardImage-replyEmoji" ||
                      forwardMessage.type === "forwardVideo-replyEmoji") && (
                      <input
                        className="display-none"
                        type="file"
                        id="addimgChat"
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange={(val) =>
                          sendImage({
                            file: val.target.files[0],
                            userId: roomId.userId,
                            destinationId: roomId.destinationUserId,
                            myRoomId: roomId.myRoomId,
                            type: "forwardEmoji-replyImage",
                            destinationRoomId: roomId.destinationRoomId,
                            time: moment().format("HH:mm"),
                            timeStamp: moment().format("YYYYMMDDhhmmss"),
                            forwardChat: forwardMessage.chat,
                            forwardName: forwardMessage.name,
                            forwardSenderId: forwardMessage.forwardSenderId,
                            forwardChatId: forwardMessage.forwardChatId,
                          })
                        }
                      />
                    )}
                  {forwardChat === true &&
                    (forwardMessage.type === "image" ||
                      forwardMessage.type === "forwardText-replyImage" ||
                      forwardMessage.type === "forwardEmoji-replyImage" ||
                      forwardMessage.type === "forwardImage-replyImage" ||
                      forwardMessage.type === "forwardVideo-replyImage") && (
                      <input
                        className="display-none"
                        type="file"
                        id="addimgChat"
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange={(val) =>
                          sendImage({
                            file: val.target.files[0],
                            userId: roomId.userId,
                            destinationId: roomId.destinationUserId,
                            myRoomId: roomId.myRoomId,
                            type: "forwardImage-replyImage",
                            destinationRoomId: roomId.destinationRoomId,
                            time: moment().format("HH:mm"),
                            timeStamp: moment().format("YYYYMMDDhhmmss"),
                            forwardChat: forwardMessage.chat,
                            forwardName: forwardMessage.name,
                            forwardSenderId: forwardMessage.forwardSenderId,
                            forwardChatId: forwardMessage.forwardChatId,
                          })
                        }
                      />
                    )}
                  {forwardChat === true &&
                    (forwardMessage.type === "video" ||
                      forwardMessage.type === "forwardText-replyVideo" ||
                      forwardMessage.type === "forwardEmoji-replyVideo" ||
                      forwardMessage.type === "forwardImage-replyVideo" ||
                      forwardMessage.type === "forwardVideo-replyVideo") && (
                      <input
                        className="display-none"
                        type="file"
                        id="addimgChat"
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange={(val) =>
                          sendImage({
                            file: val.target.files[0],
                            userId: roomId.userId,
                            destinationId: roomId.destinationUserId,
                            myRoomId: roomId.myRoomId,
                            type: "forwardVideo-replyImage",
                            destinationRoomId: roomId.destinationRoomId,
                            time: moment().format("HH:mm"),
                            timeStamp: moment().format("YYYYMMDDhhmmss"),
                            forwardChat: forwardMessage.chat,
                            forwardName: forwardMessage.name,
                            forwardSenderId: forwardMessage.forwardSenderId,
                            forwardChatId: forwardMessage.forwardChatId,
                          })
                        }
                      />
                    )}
                  <label for="addVideo">
                    <img
                      className="addImgChat"
                      src={addVideo}
                      width="30px"
                      height="30px"
                      alt="emotIcon"
                    />
                  </label>
                  {forwardChat === false && (
                    <input
                      className="display-none"
                      type="file"
                      id="addVideo"
                      accept="video/mp4,video/webm,video/ogg"
                      onChange={(val) =>
                        sendImage({
                          file: val.target.files[0],
                          userId: roomId.userId,
                          destinationId: roomId.destinationUserId,
                          myRoomId: roomId.myRoomId,
                          type: "video",
                          destinationRoomId: roomId.destinationRoomId,
                          time: moment().format("HH:mm"),
                          timeStamp: moment().format("YYYYMMDDhhmmss"),
                          forwardChat: "",
                          forwardName: "",
                          forwardSenderId: "",
                          forwardChatId: "",
                        })
                      }
                    />
                  )}
                  {forwardChat === true &&
                    (forwardMessage.type === "text" ||
                      forwardMessage.type === "forwardText-replyText" ||
                      forwardMessage.type === "forwardEmoji-replyText" ||
                      forwardMessage.type === "forwardImage-replyText" ||
                      forwardMessage.type === "forwardVideo-replyText") && (
                      <input
                        className="display-none"
                        type="file"
                        id="addVideo"
                        accept="video/mp4,video/webm,video/ogg"
                        onChange={(val) =>
                          sendImage({
                            file: val.target.files[0],
                            userId: roomId.userId,
                            destinationId: roomId.destinationUserId,
                            myRoomId: roomId.myRoomId,
                            type: "forwardText-replyVideo",
                            destinationRoomId: roomId.destinationRoomId,
                            time: moment().format("HH:mm"),
                            timeStamp: moment().format("YYYYMMDDhhmmss"),
                            forwardChat: forwardMessage.chat,
                            forwardName: forwardMessage.name,
                            forwardSenderId: forwardMessage.forwardSenderId,
                            forwardChatId: forwardMessage.forwardChatId,
                          })
                        }
                      />
                    )}
                  {forwardChat === true &&
                    (forwardMessage.type === "emoji" ||
                      forwardMessage.type === "forwardText-replyEmoji" ||
                      forwardMessage.type === "forwardEmoji-replyEmoji" ||
                      forwardMessage.type === "forwardImage-replyEmoji" ||
                      forwardMessage.type === "forwardVideo-replyEmoji") && (
                      <input
                        className="display-none"
                        type="file"
                        id="addVideo"
                        accept="video/mp4,video/webm,video/ogg"
                        onChange={(val) =>
                          sendImage({
                            file: val.target.files[0],
                            userId: roomId.userId,
                            destinationId: roomId.destinationUserId,
                            myRoomId: roomId.myRoomId,
                            type: "forwardEmoji-replyVideo",
                            destinationRoomId: roomId.destinationRoomId,
                            time: moment().format("HH:mm"),
                            timeStamp: moment().format("YYYYMMDDhhmmss"),
                            forwardChat: forwardMessage.chat,
                            forwardName: forwardMessage.name,
                            forwardSenderId: forwardMessage.forwardSenderId,
                            forwardChatId: forwardMessage.forwardChatId,
                          })
                        }
                      />
                    )}
                  {forwardChat === true &&
                    (forwardMessage.type === "image" ||
                      forwardMessage.type === "forwardText-replyImage" ||
                      forwardMessage.type === "forwardEmoji-replyImage" ||
                      forwardMessage.type === "forwardImage-replyImage" ||
                      forwardMessage.type === "forwardVideo-replyImage") && (
                      <input
                        className="display-none"
                        type="file"
                        id="addVideo"
                        accept="video/mp4,video/webm,video/ogg"
                        onChange={(val) =>
                          sendImage({
                            file: val.target.files[0],
                            userId: roomId.userId,
                            destinationId: roomId.destinationUserId,
                            myRoomId: roomId.myRoomId,
                            type: "forwardImage-replyVideo",
                            destinationRoomId: roomId.destinationRoomId,
                            time: moment().format("HH:mm"),
                            timeStamp: moment().format("YYYYMMDDhhmmss"),
                            forwardChat: forwardMessage.chat,
                            forwardName: forwardMessage.name,
                            forwardSenderId: forwardMessage.forwardSenderId,
                            forwardChatId: forwardMessage.forwardChatId,
                          })
                        }
                      />
                    )}
                  {forwardChat === true &&
                    (forwardMessage.type === "video" ||
                      forwardMessage.type === "forwardText-replyVideo" ||
                      forwardMessage.type === "forwardEmoji-replyVideo" ||
                      forwardMessage.type === "forwardImage-replyVideo" ||
                      forwardMessage.type === "forwardVideo-replyVideo") && (
                      <input
                        className="display-none"
                        type="file"
                        id="addVideo"
                        accept="video/mp4,video/webm,video/ogg"
                        onChange={(val) =>
                          sendImage({
                            file: val.target.files[0],
                            userId: roomId.userId,
                            destinationId: roomId.destinationUserId,
                            myRoomId: roomId.myRoomId,
                            type: "forwardVideo-replyVideo",
                            destinationRoomId: roomId.destinationRoomId,
                            time: moment().format("HH:mm"),
                            timeStamp: moment().format("YYYYMMDDhhmmss"),
                            forwardChat: forwardMessage.chat,
                            forwardName: forwardMessage.name,
                            forwardSenderId: forwardMessage.forwardSenderId,
                            forwardChatId: forwardMessage.forwardChatId,
                          })
                        }
                      />
                    )}
                  <textarea
                    value={
                      chatContent.charAt(0).toUpperCase() + chatContent.slice(1)
                    }
                    onChange={(e) => setChatContent(e.target.value)}
                    placeholder="Ketik pesan"
                    autoFocus="autoFocus"
                  />
                  {chatContent !== "" && forwardChat === false && (
                    <img
                      onClick={() =>
                        Send({
                          chat: chatContent,
                          userId: roomId.userId,
                          destinationId: roomId.destinationUserId,
                          myRoomId: roomId.myRoomId,
                          type: "text",
                          destinationRoomId: roomId.destinationRoomId,
                          time: moment().format("HH:mm"),
                          timeStamp: moment().format("YYYYMMDDhhmmss"),
                          forwardChat: "",
                          forwardName: "",
                          forwardSenderId: "",
                          forwardChatId: "",
                        })
                      }
                      className="sendIcon"
                      src={send}
                      width="25px"
                      height="25px"
                      alt="emotIcon"
                    />
                  )}
                  {chatContent !== "" &&
                    forwardChat === true &&
                    (forwardMessage.type === "text" ||
                      forwardMessage.type === "forwardText-replyText" ||
                      forwardMessage.type === "forwardEmoji-replyText" ||
                      forwardMessage.type === "forwardImage-replyText" ||
                      forwardMessage.type === "forwardVideo-replyText") && (
                      <img
                        onClick={() =>
                          Send({
                            chat: chatContent,
                            userId: roomId.userId,
                            destinationId: roomId.destinationUserId,
                            myRoomId: roomId.myRoomId,
                            type: "forwardText-replyText",
                            destinationRoomId: roomId.destinationRoomId,
                            time: moment().format("HH:mm"),
                            timeStamp: moment().format("YYYYMMDDhhmmss"),
                            forwardChat: forwardMessage.chat,
                            forwardName: forwardMessage.name,
                            forwardSenderId: forwardMessage.forwardSenderId,
                            forwardChatId: forwardMessage.forwardChatId,
                          })
                        }
                        className="sendIcon"
                        src={send}
                        width="25px"
                        height="25px"
                        alt="emotIcon"
                      />
                    )}
                  {chatContent !== "" &&
                    forwardChat === true &&
                    (forwardMessage.type === "emoji" ||
                      forwardMessage.type === "forwardText-replyEmoji" ||
                      forwardMessage.type === "forwardEmoji-replyEmoji" ||
                      forwardMessage.type === "forwardImage-replyEmoji" ||
                      forwardMessage.type === "forwardVideo-replyEmoji") && (
                      <img
                        onClick={() =>
                          Send({
                            chat: chatContent,
                            userId: roomId.userId,
                            destinationId: roomId.destinationUserId,
                            myRoomId: roomId.myRoomId,
                            type: "forwardEmoji-replyText",
                            destinationRoomId: roomId.destinationRoomId,
                            time: moment().format("HH:mm"),
                            timeStamp: moment().format("YYYYMMDDhhmmss"),
                            forwardChat: forwardMessage.chat,
                            forwardName: forwardMessage.name,
                            forwardSenderId: forwardMessage.forwardSenderId,
                            forwardChatId: forwardMessage.forwardChatId,
                          })
                        }
                        className="sendIcon"
                        src={send}
                        width="25px"
                        height="25px"
                        alt="emotIcon"
                      />
                    )}
                  {chatContent !== "" &&
                    forwardChat === true &&
                    (forwardMessage.type === "image" ||
                      forwardMessage.type === "forwardText-replyImage" ||
                      forwardMessage.type === "forwardEmoji-replyImage" ||
                      forwardMessage.type === "forwardImage-replyImage" ||
                      forwardMessage.type === "forwardVideo-replyImage") && (
                      <img
                        onClick={() =>
                          Send({
                            chat: chatContent,
                            userId: roomId.userId,
                            destinationId: roomId.destinationUserId,
                            myRoomId: roomId.myRoomId,
                            type: "forwardImage-replyText",
                            destinationRoomId: roomId.destinationRoomId,
                            time: moment().format("HH:mm"),
                            timeStamp: moment().format("YYYYMMDDhhmmss"),
                            forwardChat: forwardMessage.chat,
                            forwardName: forwardMessage.name,
                            forwardSenderId: forwardMessage.forwardSenderId,
                            forwardChatId: forwardMessage.forwardChatId,
                          })
                        }
                        className="sendIcon"
                        src={send}
                        width="25px"
                        height="25px"
                        alt="emotIcon"
                      />
                    )}
                  {chatContent !== "" &&
                    forwardChat === true &&
                    (forwardMessage.type === "video" ||
                      forwardMessage.type === "forwardText-replyVideo" ||
                      forwardMessage.type === "forwardEmoji-replyVideo" ||
                      forwardMessage.type === "forwardImage-replyVideo" ||
                      forwardMessage.type === "forwardVideo-replyVideo") && (
                      <img
                        onClick={() =>
                          Send({
                            chat: chatContent,
                            userId: roomId.userId,
                            destinationId: roomId.destinationUserId,
                            myRoomId: roomId.myRoomId,
                            type: "forwardVideo-replyText",
                            destinationRoomId: roomId.destinationRoomId,
                            time: moment().format("HH:mm"),
                            timeStamp: moment().format("YYYYMMDDhhmmss"),
                            forwardChat: forwardMessage.chat,
                            forwardName: forwardMessage.name,
                            forwardSenderId: forwardMessage.forwardSenderId,
                            forwardChatId: forwardMessage.forwardChatId,
                          })
                        }
                        className="sendIcon"
                        src={send}
                        width="25px"
                        height="25px"
                        alt="emotIcon"
                      />
                    )}
                  {chatContent === "" && (
                    <img
                      className="sendIcon"
                      src={send}
                      width="25px"
                      height="25px"
                      alt="emotIcon"
                    />
                  )}
                </div>
              </div>
            )}
            {roomId.destination === "" && (
              <div className=" chatView d-flex justify-content-center align-items-center col-8">
                <div className="emptyId">
                  <img src={chat} alt="" />
                  <p className="apkName">CHATLITE</p>
                  <p className="dev">by Ferdyfianaziizul</p>
                </div>
              </div>
            )}
          </div>

          {contactProfil === "contactProfil" && (
            <div
              onClick={() => setChatSetting(false)}
              className="col-2 openProfil"
            >
              <ContactProfil />
            </div>
          )}
          {contactProfil === "myProfil" && (
            <div
              onClick={() => setChatSetting(false)}
              className="col-2 openProfil"
            >
              <Profil />
            </div>
          )}
        </div>
      )}
      {openDelChat === true && (
        <div className="confirmField d-flex justify-content-center align-items-center ">
          <div className="confirm shadow text-start">
            <p>Hapus pesan ini?</p>
            <div className="btnconfirm text-end">
              <button
                onClick={() => setOpenDelChat(false)}
                className="btnconfirm1"
              >
                Tidak
              </button>
              <button onClick={() => closeDelChat()} className="btnconfirm2">
                Hapus pesan
              </button>
            </div>
          </div>
        </div>
      )}
      {chatSetting === true && <Chatsetting />}
    </div>
  );
};

const stateReducer = (state) => {
  return {
    showListContact: state.showListContact,
    showAddContact: state.showAddContact,
    listRoomChat: state.listRoomChat,
    listUser: state.listUser,
    chats: state.chats,
    roomId: state.roomId,
    account: state.account,
    assetLoading: state.assetLoading,
    roomProfil: state.roomProfil,
    contactProfil: state.contactProfil,
    contentImageLoading: state.contentImageLoading,
    progressImage: state.progressImage,
    chatSetting: state.chatSetting,
    searchInput: state.searchInput,
  };
};

const dispatchReducer = (dispatch) => ({
  showContact: (data) => dispatch({ type: "SHOW_CONTACT_MENU", value: data }),
  getContact: () => dispatch(getContact()),
  getUser: () => dispatch(getUser()),
  showAddContactMenu: (data) =>
    dispatch({
      type: "SHOW_ADD_CONTACT",
      value: data,
    }),
  hideContactMenu: (data) =>
    dispatch({
      type: "SHOW_ADD_CONTACT",
      value: data,
    }),
  showContactProfil: (data) =>
    dispatch({
      type: "SHOW_CONTACT_PROFIL",
      value: data,
    }),
  setChatSetting: (data) =>
    dispatch({
      type: "CHAT_SETTING",
      value: data,
    }),
  setSearchInput: (data) =>
    dispatch({
      type: "searchContact",
      value: data,
    }),
  getRoom: () => dispatch(getRoom()),
  sendChat: (data) => dispatch(sendChat(data)),
  getChats: (data) => dispatch(getChats(data)),
  getRoomId: (data) => dispatch(getRoomId(data)),
  getAccount: () => dispatch(getAccount()),
  loadProfilRoom: (data) => dispatch(loadProfilRoom(data)),
  getRoomContact: () => dispatch(getRoomContact()),
  SendImage: (data) => dispatch(SendImage(data)),
  deleteChat: (data) => dispatch(deleteChat(data)),
});

export default connect(stateReducer, dispatchReducer)(ChatRoom);
