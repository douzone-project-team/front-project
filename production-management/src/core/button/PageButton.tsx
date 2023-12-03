import {Box} from "@material-ui/core";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import {Component} from "react";

type PageButtonProps = {
  options: {
    handlePrevPage: () => void,
    handleNextPage: () => void,
    currentPage: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
  }
}

type PageButtonState = {
  isHoverLeft: boolean,
  isHoverRight: boolean
}


/**
 * PageButton 테이블 하단 페이지 이동 버튼 생성
 * 
 * handlePrevPage: () => void | 이전페이지 함수
 * handleNextPage: () => void | 다음페이지 함수
 * currentPage: number        | 현재 페이지 번호
 * hasPreviousPage: boolean   | 이전페이지 여부
 * hasNextPage: boolean       | 다음페이지 여부
 */
export class PageButton extends Component<PageButtonProps, PageButtonState> {
  constructor(props: PageButtonProps) {
    super(props);
    this.state = {
      isHoverLeft: false,
      isHoverRight: false
    };
  }

  render() {
    const {handlePrevPage, handleNextPage, currentPage, hasPreviousPage, hasNextPage} = this.props.options;
    const {isHoverLeft, isHoverRight} = this.state;

    return (
        <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
        >
          {hasPreviousPage ?
              <KeyboardArrowLeft
                  onClick={() => {
                    handlePrevPage();
                    this.setState({isHoverLeft: false});
                  }}
                  onMouseEnter={() => this.setState({isHoverLeft: true})}
                  onMouseLeave={() => this.setState({isHoverLeft: false})}
                  style={{
                    cursor: 'pointer',
                    color: isHoverLeft ? 'black' : '#3C50C2',
                    fontSize: '35px'
                  }}
              />
              : <KeyboardArrowLeft style={{color: 'gray', fontSize: '35px'}}/>}
          {currentPage}
          {hasNextPage ?
              <KeyboardArrowRight
                  onClick={() => {
                    handleNextPage();
                    this.setState({isHoverRight: false});
                  }}
                  onMouseEnter={() => this.setState({isHoverRight: true})}
                  onMouseLeave={() => this.setState({isHoverRight: false})}
                  style={{
                    cursor: 'pointer',
                    color: isHoverRight ? 'black' : '#3C50C2',
                    fontSize: '35px'
                  }}
              />
              : <KeyboardArrowRight style={{color: 'gray', fontSize: '35px'}}/>}
        </Box>
    )
  }
}