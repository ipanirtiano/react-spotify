import { useStateProvider } from "../utils/StateProvider"

const Navbar = () => {
  const [{userInfo}] = useStateProvider()

  return (
    <div className="conatiner-navbar">
      <div className="search-bar">
      <span className="material-symbols-outlined">search</span>
        <input type="text" placeholder="Artist, songs, or podcast" />
      </div>
      <div className="avatar">
        <a href="#">
          <span className="material-symbols-outlined profile">account_circle</span>
          <p>{userInfo.userName}</p>
        </a>
      </div>
    </div>
  )
}

export default Navbar
