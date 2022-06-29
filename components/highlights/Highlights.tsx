import React from "react";
import ReactHtmlParser from "react-html-parser";
interface Props {
    moment: any;
    extra: Array<string>;
}
export default class Highlights extends React.Component<Props> {
    returnCorrectName = (name: string, name_number: number) => {
        const splittedName = name.split("|");
        return name_number === 1 ? `<span>${splittedName[0]}   </span>|   ${splittedName[splittedName.length - 1]}` : `${splittedName[0]}   |<span>   ${splittedName[splittedName.length - 1]}</span>`;
    };
    render() {
        return (
            <div className="moment">
                {this.props.moment ? (
                    <React.Fragment>
                        {this.props.moment.actions.map((action: any, index: number) => {
                            return (
                                <React.Fragment key={`${Math.random()}-${index}`}>
                                    <div className={`moment__item highlight_team_${action.player_number}`}>
                                        <div className={`moment__item_player moment__item_player_${action.player_number}`}>
                                            <p className={`moment__item_player_inner moment__item_player_${action.player_number}_inner`}>{ReactHtmlParser(this.returnCorrectName(action.player, action.player_number))}</p>
                                        </div>
                                        <div className="moment__item_highlight">
                                            {action.cards ? (
                                                <React.Fragment>
                                                    {action.cards.map((card: string, _index: number) => {
                                                        return <div className={action.cards.length > 1 ? `moment__item_action moment__item_action_${card} moment_not-single-card_${card}` : `moment__item_action moment__item_action_${card} moment_single-card_${card}`} key={`${Math.random()}-${_index}`}></div>;
                                                    })}
                                                </React.Fragment>
                                            ) : null}
                                            {action.isGoal ? (
                                                <div className={`moment__item_action moment__item_action_goal`}>
                                                    <img className={`moment__item_action_inner moment__item_action_goal_inner`} src={this.props.moment.goal} alt="Goal" />
                                                </div>
                                            ) : null}
                                            {(action.didGetHalftime && !action.afterHalftime && action.isLast) || (action.didGetHalftime && action.afterHalftime && action.isLast) ? <div className={`moment__item_last`}></div> : null}
                                        </div>
                                    </div>
                                    {action.didGetHalftime && !action.afterHalftime ? (
                                        <div className="moment__item_halftime">
                                            <p className="moment__item_halftime_inner">{this.props.extra[0]}</p>
                                        </div>
                                    ) : null}
                                </React.Fragment>
                            );
                        })}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className="moment__no">
                            <p className="moment__no_inner">{this.props.extra[1]}</p>
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    }
}
