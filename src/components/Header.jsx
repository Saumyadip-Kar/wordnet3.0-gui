
//Header.jsx
import SettingsButton from "./SettingsButton";
import ThemeToggle from "./ThemeToggle";
import MenuButton from "./MenuButton";

const Header = ({ info, infoType, setInfoType, setWordInfo, setNodesLen, setEdgesLen, treeInfo, setTreeInfo, setLoading, cyRef}) => {
    return (
            <div className="flex flex-wrap items-center space-x-2 p-1 bg-gray-800 rounded-md">
              <h1>WordNet 3.0</h1>
              <ThemeToggle info={info}/>
              <SettingsButton/>
              <MenuButton 
                info={info} infoType={infoType} setInfoType={setInfoType} setWordInfo={setWordInfo} 
                setNodesLen={setNodesLen} setEdgesLen={setEdgesLen} treeInfo={treeInfo} setTreeInfo={setTreeInfo} 
                setLoading={setLoading} cyRef={cyRef}
              />
              <div className="text-sm ml-auto mt-2 sm:mt-0">
                Made by <span className="font-medium">Saumyadip</span> ·{" "}
                <a
                  href="https://github.com/Saumyadip-Kar/wordnet3.0-gui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-400 transition"
                >
                  View Source
                </a>
              </div>
            </div>
            );
  };
  
  export default Header;
  