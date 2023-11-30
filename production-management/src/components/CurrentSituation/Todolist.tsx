import React, { Component } from 'react';
import { Box } from '@material-ui/core';

interface TodoItem {
    text: string;
    crossed: boolean;
}

interface TodoListState {
    todoItems: TodoItem[];
}

class TodoList extends Component<{}, TodoListState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            todoItems: [
                { text: "1. 입고현황 \n" +
                        "    A. 금월 입고 건수\n" +
                        "    B. 누적 입고 건수", crossed: false },
                { text: "2. 출고 현황\n" +
                        "    A. 금월 출고 건수\n" +
                        "    B. 누적 출고 건수", crossed: false },
                { text: "3. 만료일이 가까운 지시\n" +
                        "    A. 금일 기준 7일 1번\n" +
                        "    B. 금일 기준 7일 2번", crossed: false },
                { text: "4. 거래가 많은 거래처\n" +
                        "    A. 거래처 1등\n" +
                        "    B. 거래처 2등", crossed: false },
            ],
        };
    }

    // 새로운 항목 추가
    addItem = () => {
        const newItem = prompt("추가할 항목을 입력하세요:");
        if (newItem) {
            this.setState((prevState) => ({
                todoItems: [...prevState.todoItems, { text: newItem, crossed: false }],
            }));
        }
    };

    // 항목 삭제
    removeItem = (index: number) => {
        const updatedItems = [...this.state.todoItems];
        updatedItems.splice(index, 1);
        this.setState({
            todoItems: updatedItems,
        });
    };

    // 항목 토글 시 스타일 변경
    toggleItemStyle = (index: number) => {
        const updatedItems = [...this.state.todoItems];
        updatedItems[index].crossed = !updatedItems[index].crossed;
        this.setState({
            todoItems: updatedItems,
        });
    };

    render() {
        return (
            <Box borderRadius={10} boxShadow={3} style={{ marginTop: '15px', width: '330px', height: '190px', display: 'flex', backgroundColor: '#F3EBBC', alignItems: 'center', paddingLeft: '20px' }}>
                <Box>
                    <span style={{ fontSize: '25px' }}>My Todo List</span>
                    <Box/>
                    <ul>
                        {this.state.todoItems.map((item, index) => (
                            <li
                                key={index}
                                style={{
                                    cursor: 'pointer',
                                }}
                                onClick={(e) => {
                                    e.stopPropagation(); // 이벤트 전파 막기
                                    this.toggleItemStyle(index); // 글자 클릭 시 토글
                                }}
                            >
    <span
        style={{
            textDecoration: item.crossed ? 'line-through' : 'none',
            color: item.crossed ? 'red' : 'black',
        }}
    >
        {item.text}
    </span>
                                <span
                                    style={{
                                        marginLeft: '10px',
                                        cursor: 'pointer',
                                        color: 'black',
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation(); // 이벤트 전파 막기
                                        this.removeItem(index); // 아이콘 클릭 시 삭제
                                    }}
                                >
        <span style={{ textDecoration: 'none', color: 'red' }}>❌</span>
    </span>
                            </li>
                        ))}
                    </ul>
                    <button onClick={this.addItem}>추가</button>
                </Box>
            </Box>
        );
    }
}

export default TodoList;
