import {
  AddInstruction,
  InstructionSearch,
  UpdateInstruction
} from "../../object/Instruction/Instruction-object";
import Fetcher from "../fetch-action";

const fetcher = new Fetcher();

class InstructionAction {
  private baseUrl: string = '/instructions';

  // 지시 등록
  public addInstruction(addInstruction: AddInstruction) {
    const URL = `${this.baseUrl}`;
    return fetcher.POST(URL, addInstruction);
  }

  // 지시 조회
  public getInstruction(instructionNo: string) {
    const URL = `${this.baseUrl}/` + instructionNo;
    return fetcher.GET(URL);
  }

  // 지시 조회 - 리스트
  public getInstructionList(instructionSearch: InstructionSearch) {
    const URL = `${this.baseUrl}/list`;
    return fetcher.GET(URL, instructionSearch);
  }

  // 지시 수정
  public updateInstruction(upadateInstruction: UpdateInstruction) {
    const URL = `${this.baseUrl}/` + upadateInstruction.instructionNo;
    return fetcher.PUT(URL, upadateInstruction);
  }

  // 지시 삭제
  public deleteInstruction(instructionNo: string) {
    const URL = `${this.baseUrl}/` + instructionNo;
    return fetcher.DELETE(URL);
  }
}

export default InstructionAction;