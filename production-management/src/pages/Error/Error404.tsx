import {Component} from "react";
// @ts-ignore
import error404 from "../../images/404-error.png"
import Typography from "@material-ui/core/Typography";
import Layout from "../../common/Layout";
import {Box} from "@material-ui/core";

import "./error.css";
import {Link} from "react-router-dom";
// @ts-ignore
import logo from "../../images/BLOOMING.png";

class Error404 extends Component {
    render() {
        return (
            <div>
                <Link to="/main-page" style={{textDecoration: 'none', color: 'black'}}>
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '100vh',
                            position: 'relative',
                            fontFamily: 'S-CoreDream-3Light',
                            fontWeight: 'bold'
                        }}
                    >
                        <div className="arrow_box">
                            404 ERROR
                        </div>
                        <img
                            src={error404}
                            alt="404 Error"
                            width={200}
                            height={200}
                        />
                        <Typography variant="h5" color="inherit" style={{marginBottom: '10px' , fontFamily: 'S-CoreDream-3Light'}}>
                            페이지를 찾을 수 없습니다.
                        </Typography>
                        <Typography variant="body1" color="textSecondary" style={{fontFamily: 'S-CoreDream-3Light'}}>
                            요청하신 페이지를 찾을 수 없습니다. 입력하신 URL을 다시 확인해주세요.
                        </Typography>
                        <Box
                            style={{
                                position: 'absolute',
                                bottom: '30px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <img src={logo} style={{ height: '18px', marginRight: '8px' }} />
                            <Typography variant="caption" color="textSecondary">
                                Copyright @ Blooming
                            </Typography>
                        </Box>
                    </Box>
                </Link>
            </div>
        )
    }
}

export default Error404;