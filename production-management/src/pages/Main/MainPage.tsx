import React, {Component} from 'react';
import Main from '../../components/CurrentSituation/Main'
/*import SemiBox from '../../components/CurrentSituation/SemiBox'*/
import Layout from '../../common/Layout';

class MainPage extends Component {

  render() {
    return (
        <Layout>
          <Main/>
        </Layout>
    );
  }
}


export default MainPage;
