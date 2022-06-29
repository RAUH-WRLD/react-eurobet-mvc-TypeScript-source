import React from "react";
interface Props {
    game: any;
}
export default class Match extends React.Component<Props> {
    render() {
        return (
            <React.Fragment>
                {this.props.game ? (
                    <div className="matches__body_main_item body__main_item">
                        <div className="matches__body_main_item_player body__main_item_player_1 matches__body_main_item_player_1 not-selectable">
                            <img className="matches__body_main_item_player_icon body__main_item_player_1_icon not-selectable" src={this.props.game.player_1.country} alt={this.props.game.player_1.name} />
                            <span className="matches__body_main_item_player_name body__main_item_player_1_name">{this.props.game.player_1.name}</span>
                        </div>
                        {this.props.game.time ? (
                            <p className="matches__body_main_item_time body__main_item_time">{this.props.game.time}</p>
                        ) : (
                            <React.Fragment>
                                {this.props.game.player_1.score !== this.props.game.player_2.score ? <p className="matches__body_main_item_score body__main_item_score">{`${this.props.game.player_1.score} - ${this.props.game.player_2.score}`}</p> : null}
                                {this.props.game.player_1.score === this.props.game.player_2.score ? <p className="matches__body_main_item_score_drawn body__main_item_score_drawn">{`${this.props.game.player_1.score} - ${this.props.game.player_2.score}`}</p> : null}
                            </React.Fragment>
                        )}
                        <div className="matches__body_main_item_player body__main_item_player_2 matches__body_main_item_player_2 not-selectable">
                            <span className="matches__body_main_item_player_name body__main_item_player_2_name">{this.props.game.player_2.name}</span>
                            <img className="matches__body_main_item_player_icon body__main_item_player_2_icon not-selectable" src={this.props.game.player_2.country} alt={this.props.game.player_2.name} />
                        </div>
                    </div>
                ) : null}
            </React.Fragment>
        );
    }
}
