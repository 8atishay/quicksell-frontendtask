import React from "react";
import "./quicksell.css";
class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			atishay: 1,
			Max: Number.MAX_VALUE,
		};
	}
	componentDidMount() {
		fetch("https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json")
			.then((res) => res.json())
			.then(
				(result) => {
					if (!result) {
						result = 1;
					}
					if (result == "MAX_VALUE") {
						this.setState({
							atishay: Number.MAX_VALUE,
						});
					} else {
						this.setState({
							atishay: result,
						});
					}
				},
				(error) => {
					this.setState({
						atishay: 1,
					});
				}
			);
	}
	componentDidUpdate() {
		const requestOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ atishay: this.state.atishay }),
		};
		fetch("https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json", requestOptions);
		setTimeout(() => {
			document.getElementById("saving").className = "hidden";
		}, 100);
	}
	update = () => {
		document.getElementById("saving").className = "show";
	};
	add = () => {
		if (this.state.atishay < this.state.Max) {
			this.setState({
				atishay: this.state.atishay + 1,
			});
		}
		this.update();
	};
	subtract = () => {
		this.setState({
			atishay: this.state.atishay - 1,
		});
		this.update();
	};
	textchange = () => {
		var x = +document.getElementById("count").innerHTML;
		if (x && x <= this.state.Max) {
			this.setState({
				atishay: x,
			});
		}
		this.update();
	};
	render() {
		return (
			<div>
				<div style={{ padding: "10px 39px" }}>
					<div id="saving" class="hidden" style={{ maxHeight: "16px" }}>
						<div class="loader"></div>
						<b>Saving counter value</b>
					</div>
					<div className="function">
						<button className="buttonminus" onClick={this.subtract}>
							-
						</button>
						<div id="count" className="counter" onInput={this.textchange} contentEditable>
							{this.state.atishay}
						</div>
						<button className="buttonplus" onClick={this.add}>
							+
						</button>
					</div>
					<div style={{ fontSize: "12px" }}>
						<b>Counter value: {this.state.atishay}</b>
					</div>
				</div>
			</div>
		);
	}
}

export default Counter;
