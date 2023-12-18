import {Button} from "@material-ui/core";
import {Component} from "react";

type ProgressButtonProps = {
  options: {
    koreanStatus: string,
    checked: boolean,
    width: string,
    changeFunc: () => void,
    handleSearchProgressState: (status: string) => void,
    setStateAllFalse: () => void,
  }
}

type ProgressButtonState = {
  getKey(koreanStatus: string): string
}

type StatusType = {
  [key: string]: string;
};

const statusMap: StatusType[] = [
  {전체: ''},
  {준비: 'standby'},
  {진행: 'progress'},
  {완료: 'completed'},
  {미완료: 'incomplete'}
];

/**
 * 상태 버튼
 *
 *  koreanStatus: string                                  | 한글 명
 *  checked: boolean                                      | 버튼 선택 여부
 *  width: string                                         | 버튼 크기
 *  changeFunc: () => void                                | 버튼 선택 메서드
 *  handleSearchProgressState: (status: string) => void   | 버튼 클릭시 이벤트 메서드
 *  setStateAllFalse: () => void                          | 모든 버튼 비활성화 메서드
 */
export class ProgressButton extends Component<ProgressButtonProps, ProgressButtonState> {

  constructor(props: ProgressButtonProps) {
    super(props);
    this.state = {
      getKey: (koreanStatus: string) => {
        for (const status of statusMap) {
          for (const key in status) {
            if (key === koreanStatus) {
              return status[key];
            }
          }
        }
        return '';
      }
    }
  }

  render() {
    const {
      koreanStatus,
      checked,
      width,
      changeFunc,
      handleSearchProgressState,
      setStateAllFalse
    } = this.props.options;

    return (
        <Button
            variant="outlined"
            style={{
              width: width,
              marginLeft: '1.3%',
              border: ('2px solid #D3D3D3'),
              borderColor: (checked ? 'rgb(60,123,194)' : 'rgba(211,211,211,0.19)'),
              backgroundColor: (checked ? '' : 'rgba(211,211,211,0.19)')
            }}
            onClick={() => {
              handleSearchProgressState(this.state.getKey(koreanStatus).toLocaleUpperCase());
              setStateAllFalse();
              changeFunc();
            }}
        >
          <img
              src={require(`../../images/${this.state.getKey(koreanStatus) ? this.state.getKey(koreanStatus) : 'all'}.png`)}
              style={{width: '50px'}} alt={koreanStatus}/>
          <span style={{
            fontWeight: 'bold',
            color: (checked ? 'rgb(60,123,194)' : 'rgba(0,0,0,0.7)'),
            fontFamily: 'S-CoreDream-3Light',
            fontSize: '17px',
          }}>{koreanStatus}</span>
        </Button>
    );
  }
}