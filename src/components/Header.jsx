
//Header.jsx
import SettingsButton from "./SettingsButton";
import ThemeToggle from "./ThemeToggle";
import MenuButton from "./MenuButton";

const Header = ({ info, infoType, setInfoType, setWordInfo, setNodesLen, setEdgesLen, treeInfo, setTreeInfo, setLoading}) => {
    return (
            <div className="flex items-center space-x-2 p-1 bg-gray-800 rounded-md">
              <h1>WordNet 3.0</h1>
              <ThemeToggle info={info}/>
              <SettingsButton/>
              <MenuButton info={info} infoType={infoType} setInfoType={setInfoType} setWordInfo={setWordInfo} setNodesLen={setNodesLen} setEdgesLen={setEdgesLen} treeInfo={treeInfo} setTreeInfo={setTreeInfo} setLoading={setLoading}/>
            </div>
            );
  };
  
  export default Header;
  