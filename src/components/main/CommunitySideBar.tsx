import { useState } from "react";
import BackgroundImg from "../styled/BackgroundImg";
import StyledAvatar from "../styled/StyledAvatar";
import StyledTab from "../styled/StyledTab";
import StyledTabs from "../styled/StyledTabs";
import TabPanel from "../styled/TabPanel";

const CommunitySideBar = () => {
  const [tab, setTab] = useState(0);

  const changeTab = (_: any, newTab: number) => {
    setTab(newTab);
  };

  return (
    <>
      <StyledTabs
        orientation="vertical"
        value={tab}
        onChange={changeTab}
        variant="scrollable"
        allowScrollButtonsMobile
        scrollButtons="auto"
      >
        <StyledTab
          icon={
            <StyledAvatar
              variant="rounded"
              src="http://stencilfont.org/stencilfonts/grunge/grunge-stencil-a.jpg"
              alt="community name"
              size={8}
            />
          }
        />
        <StyledTab
          icon={
            <StyledAvatar
              variant="rounded"
              src="http://stencilfont.org/stencilfonts/graffiti/graffiti-stencil-b.jpg"
              alt="community name"
              size={8}
            />
          }
        />
      </StyledTabs>

      <TabPanel value={tab} index={0}>
        <BackgroundImg
          height="20%"
          cover="https://121clicks.com/wp-content/uploads/2019/07/landscape_photography_course_ian_plant_01.jpg"
        />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <BackgroundImg
          height="20%"
          cover="https://www.northlandscapes.com/files/images/portfolio-2020/northlandscapes-antarctica-a-faint-resemblance-cover.jpg"
        />
      </TabPanel>
    </>
  );
};

export default CommunitySideBar;
