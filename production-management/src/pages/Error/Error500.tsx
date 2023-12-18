import {Component} from "react";
// @ts-ignore
import error500 from "../../images/500-error.png"
// @ts-ignore
import logo from "../../images/BLOOMING.png"
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";

import "./error.css";
import {Link} from "react-router-dom";

class Error500 extends Component {
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
                            500 Error
                        </div>
                        <img
                            src={error500}
                            alt="500 Error"
                            width={150}
                            height={150}
                            style={{
                                marginTop: '20px', marginBottom: '10px'
                            }}
                        />
                        <Typography variant="h5" color="inherit" style={{marginBottom: '10px', fontFamily: 'S-CoreDream-3Light'}}>
                            서버에서 오류가 발생했습니다.
                        </Typography>
                        <Typography variant="body1" color="textSecondary" style={{textAlign: 'center', fontFamily: 'S-CoreDream-3Light'}}>
                            죄송합니다. 현재 서버에서 문제가 발생하여 요청하신 페이지를 불러올 수 없습니다.
                            <br/>
                            잠시 후에 다시 시도해주세요.
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
                            <Typography variant="caption" color="textSecondary" style={{fontFamily: 'S-CoreDream-3Light'}}>
                                Copyright @ Blooming
                            </Typography>
                        </Box>
                    </Box>
                </Link>
            </div>
        )
    }
}

export default Error500;