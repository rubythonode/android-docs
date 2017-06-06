// @flow
import React from 'react';
import {OverviewHeader} from '../../src/components/overview_header';
import * as constants from '../../constants';

class NavigationLayout extends React.Component {
  state: {
    windowWidth: number
  };
  constructor() {
    super();
    this.state = {windowWidth: 1200};
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    if (window !== 'undefined') {
      this.setState({ windowWidth: this.state.windowWidth = window.innerWidth });
    }
  }

  render() {
    let {windowWidth} = this.state;

    var stringLink = this.props.location.pathname;
    var overview = stringLink.match(/\/([^\/?]+)(?=\/$|\?|$)/)
    if (overview) {
      if (overview[1] == 'overview') {
        var show = true;
      }
    }
    return (
      <div>
        {/* Content */}
        <div className={'prose color-gray-dark'}>
          <div className={`content ${windowWidth < 690 ? 'col--12' : 'col--9 col col--offl3'}`}>
            {show && <OverviewHeader
              deviceImg={"../../assets/imgs/nav-sdk-splash.png"}
              sdk={"Navigation SDK"}
              imgWidth={360}
              version={constants.NAVIGATION_VERSION}
              changelogLink={"https://github.com/mapbox/mapbox-navigation-android/blob/master/CHANGELOG.md"}
              ghLink={"https://github.com/mapbox/mapbox-navigation-android"}
              sdkFeatures={['Off-route detection', 'Timed instructions', 'Snap to route', 'Route progress info', 'Traffic routing']}
              newFeature={[false, false, false, false, false]}/>}
            <div className='pt12 doc-ul doc-ol pb96 wmax1200 doc-ol-item'>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavigationLayout