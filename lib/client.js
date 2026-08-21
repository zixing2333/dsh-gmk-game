window.__ModuleLoader__.load({
	id: "dsh-gmk-game",
	factory: (require) =&gt; {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

		var React = require("react");
		var useState = React.useState;
		var useEffect = React.useEffect;
		var useCallback = React.useCallback;
		var createElement = React.createElement;

		// Inject CSS
		const css = `
			.gomoku-plugin-container {
				position: fixed;
				bottom: 20px;
				right: 20px;
				width: 320px;
				background: var(--dsw-alias-bg-overlay);
				backdrop-filter: blur(12px);
				-webkit-backdrop-filter: blur(12px);
				border-radius: 16px;
				border: 1px solid var(--dsw-alias-border-l1);
				box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
				padding: 16px;
				z-index: 9999;
				transition: all 0.3s ease;
				opacity: 0.7;
			}
			.gomoku-plugin-container:hover {
				opacity: 1;
				transform: translateY(-4px);
				box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
			}
			.gomoku-plugin-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 12px;
			}
			.gomoku-plugin-title {
				font-size: 16px;
				font-weight: 600;
				color: var(--dsw-alias-label-primary);
				margin: 0;
			}
			.gomoku-plugin-status {
				font-size: 13px;
				color: var(--dsw-alias-label-secondary);
				margin-right: 8px;
			}
			.gomoku-plugin-header-right {
				display: flex;
				gap: 8px;
				align-items: center;
			}
			.gomoku-plugin-board-wrapper {
				position: relative;
				width: 100%;
				aspect-ratio: 1;
				background: linear-gradient(135deg, rgba(222, 184, 135, 0.6), rgba(210, 180, 140, 0.6));
				border-radius: 8px;
				padding: 12px;
				box-sizing: border-box;
			}
			.gomoku-plugin-board {
				position: relative;
				width: 100%;
				height: 100%;
			}
			.gomoku-plugin-grid-line {
				position: absolute;
				background-color: rgba(0, 0, 0, 0.3);
			}
			.gomoku-plugin-grid-line-h {
				width: 100%;
				height: 1px;
				left: 0;
			}
			.gomoku-plugin-grid-line-v {
				height: 100%;
				width: 1px;
				top: 0;
			}
			.gomoku-plugin-stone {
				position: absolute;
				border-radius: 50%;
				transform: translate(-50%, -50%);
				transition: transform 0.15s ease;
				cursor: pointer;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
			}
			.gomoku-plugin-stone-black {
				background: radial-gradient(circle at 30% 30%, #555, #000);
			}
			.gomoku-plugin-stone-white {
				background: radial-gradient(circle at 30% 30%, #fff, #ddd);
				border: 1px solid rgba(0, 0, 0, 0.1);
			}
			.gomoku-plugin-stone-winning {
				animation: gomoku-plugin-pulse 1s infinite alternate;
			}
			@keyframes gomoku-plugin-pulse {
				from { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
				to { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
			}
			.gomoku-plugin-intersection {
				position: absolute;
				width: calc(100% / 14);
				height: calc(100% / 14);
				transform: translate(-50%, -50%);
				cursor: pointer;
				border-radius: 50%;
			}
			.gomoku-plugin-intersection:hover {
				background: rgba(0, 0, 0, 0.05);
			}
			.gomoku-plugin-controls {
				display: flex;
				gap: 8px;
				margin-top: 12px;
			}
			.gomoku-plugin-btn {
				flex: 1;
				padding: 8px 12px;
				border: 1px solid var(--dsw-alias-border-l1);
				border-radius: 8px;
				background: var(--dsw-alias-bg-layer-2);
				color: var(--dsw-alias-label-primary);
				font-size: 13px;
				cursor: pointer;
				transition: all 0.2s ease;
			}
			.gomoku-plugin-btn:hover:not(:disabled) {
				background: var(--dsw-alias-brand-primary);
				color: white;
				border-color: var(--dsw-alias-brand-primary);
			}
			.gomoku-plugin-btn:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}
			.gomoku-plugin-win-overlay {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(0, 0, 0, 0.3);
				border-radius: 8px;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				color: white;
				font-weight: 600;
				backdrop-filter: blur(2px);
				-webkit-backdrop-filter: blur(2px);
			}
			.gomoku-plugin-win-text {
				font-size: 20px;
				margin-bottom: 8px;
				text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
			}
			.gomoku-plugin-win-restart-btn {
				max-width: 120px;
				flex: none;
			}
			.gomoku-plugin-minimized {
				width: auto;
				padding: 8px 12px;
				opacity: 0.9 !important;
			}
			.gomoku-plugin-minimized .gomoku-plugin-board-wrapper,
			.gomoku-plugin-minimized .gomoku-plugin-status,
			.gomoku-plugin-minimized .gomoku-plugin-controls {
				display: none;
			}
			.gomoku-plugin-minimize-btn {
				background: none;
				border: none;
				color: var(--dsw-alias-label-secondary);
				cursor: pointer;
				font-size: 16px;
				padding: 0;
				width: 24px;
				height: 24px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 4px;
			}
			.gomoku-plugin-minimize-btn:hover {
				background: var(--dsw-alias-bg-layer-2);
			}
			.gomoku-plugin-star {
				position: absolute;
				width: 6px;
				height: 6px;
				background: rgba(0, 0, 0, 0.4);
				border-radius: 50%;
				transform: translate(-50%, -50%);
			}
		`;

		const tagId = "dsh-gmk-game/gomoku.css";
		if (typeof document !== "undefined" &amp;&amp; document.querySelector('style[data-plugin-css="' + tagId + '"]') === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-gmk-game";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}

		const BOARD_SIZE = 15;
		const CELL_SIZE = 100 / (BOARD_SIZE - 1);

		// Factory function to create GomokuGame component with timer injected
		function createGomokuComponent(timer) {
			return function GomokuGame() {
				const [board, setBoard] = useState(() =&gt;
					Array(BOARD_SIZE).fill(null).map(() =&gt; Array(BOARD_SIZE).fill(0))
				);
				const [currentPlayer, setCurrentPlayer] = useState(1);
				const [winner, setWinner] = useState(0);
				const [winningLine, setWinningLine] = useState([]);
				const [isMinimized, setIsMinimized] = useState(false);
				const [lastMove, setLastMove] = useState(null);
				const [history, setHistory] = useState([]);

				const checkWin = useCallback((board, x, y, player) =&gt; {
					const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
					for (const [dx, dy] of directions) {
						let count = 1;
						const line = [[x, y]];
						for (let i = 1; i &lt; 5; i++) {
							const nx = x + dx * i;
							const ny = y + dy * i;
							if (nx &gt;= 0 &amp;&amp; nx &lt; BOARD_SIZE &amp;&amp; ny &gt;= 0 &amp;&amp; ny &lt; BOARD_SIZE &amp;&amp; board[nx][ny] === player) {
								count++;
								line.push([nx, ny]);
							} else break;
						}
						for (let i = 1; i &lt; 5; i++) {
							const nx = x - dx * i;
							const ny = y - dy * i;
							if (nx &gt;= 0 &amp;&amp; nx &lt; BOARD_SIZE &amp;&amp; ny &gt;= 0 &amp;&amp; ny &lt; BOARD_SIZE &amp;&amp; board[nx][ny] === player) {
								count++;
								line.push([nx, ny]);
							} else break;
						}
						if (count &gt;= 5) return line;
					}
					return null;
				}, []);

				const makeAIMove = useCallback((currentBoard) =&gt; {
					let bestScore = -Infinity;
					let bestMove = null;

					const getLineScore = (board, x, y, dx, dy, player) =&gt; {
						let count = 0;
						let openEnds = 0;
						for (let i = 1; i &lt; 5; i++) {
							const nx = x + dx * i;
							const ny = y + dy * i;
							if (nx &lt; 0 || nx &gt;= BOARD_SIZE || ny &lt; 0 || ny &gt;= BOARD_SIZE) break;
							if (board[nx][ny] === player) count++;
							else if (board[nx][ny] === 0) { openEnds++; break; }
							else break;
						}
						for (let i = 1; i &lt; 5; i++) {
							const nx = x - dx * i;
							const ny = y - dy * i;
							if (nx &lt; 0 || nx &gt;= BOARD_SIZE || ny &lt; 0 || ny &gt;= BOARD_SIZE) break;
							if (board[nx][ny] === player) count++;
							else if (board[nx][ny] === 0) { openEnds++; break; }
							else break;
						}
						if (count &gt;= 4) return 100000;
						if (count === 3 &amp;&amp; openEnds === 2) return 10000;
						if (count === 3 &amp;&amp; openEnds === 1) return 1000;
						if (count === 2 &amp;&amp; openEnds === 2) return 500;
						if (count === 2 &amp;&amp; openEnds === 1) return 100;
						if (count === 1 &amp;&amp; openEnds === 2) return 50;
						if (count === 1 &amp;&amp; openEnds === 1) return 10;
						return 0;
					};

					const scorePosition = (board, x, y, player) =&gt; {
						if (board[x][y] !== 0) return -1;
						const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
						let score = 0;
						for (const [dx, dy] of directions) {
							score += getLineScore(board, x, y, dx, dy, player);
						}
						const centerDist = Math.abs(x - 7) + Math.abs(y - 7);
						score += (14 - centerDist) * 2;
						return score;
					};

					for (let i = 0; i &lt; BOARD_SIZE; i++) {
						for (let j = 0; j &lt; BOARD_SIZE; j++) {
							if (currentBoard[i][j] === 0) {
								currentBoard[i][j] = 2;
								if (checkWin(currentBoard, i, j, 2)) {
									currentBoard[i][j] = 0;
									return [i, j];
								}
								currentBoard[i][j] = 0;
							}
						}
					}

					for (let i = 0; i &lt; BOARD_SIZE; i++) {
						for (let j = 0; j &lt; BOARD_SIZE; j++) {
							if (currentBoard[i][j] === 0) {
								currentBoard[i][j] = 1;
								if (checkWin(currentBoard, i, j, 1)) {
									currentBoard[i][j] = 0;
									return [i, j];
								}
								currentBoard[i][j] = 0;
							}
						}
					}

					let hasStones = false;
					for (let i = 0; i &lt; BOARD_SIZE; i++) {
						for (let j = 0; j &lt; BOARD_SIZE; j++) {
							if (currentBoard[i][j] !== 0) { hasStones = true; break; }
						}
						if (hasStones) break;
					}
					if (!hasStones) return [7, 7];

					for (let i = 0; i &lt; BOARD_SIZE; i++) {
						for (let j = 0; j &lt; BOARD_SIZE; j++) {
							if (currentBoard[i][j] === 0) {
								let hasNeighbor = false;
								for (let di = -2; di &lt;= 2; di++) {
									for (let dj = -2; dj &lt;= 2; dj++) {
										const ni = i + di;
										const nj = j + dj;
										if (ni &gt;= 0 &amp;&amp; ni &lt; BOARD_SIZE &amp;&amp; nj &gt;= 0 &amp;&amp; nj &lt; BOARD_SIZE &amp;&amp; currentBoard[ni][nj] !== 0) {
											hasNeighbor = true; break;
										}
									}
									if (hasNeighbor) break;
								}
								if (!hasNeighbor) continue;

								const aiScore = scorePosition(currentBoard, i, j, 2);
								const playerScore = scorePosition(currentBoard, i, j, 1);
								const totalScore = aiScore + playerScore * 0.9;
								if (totalScore &gt; bestScore) {
									bestScore = totalScore;
									bestMove = [i, j];
								}
							}
						}
					}
					return bestMove || [7, 7];
				}, [checkWin]);

				const placeStone = useCallback((x, y) =&gt; {
					if (winner || board[x][y] !== 0) return;
					const newBoard = board.map(row =&gt; [...row]);
					newBoard[x][y] = currentPlayer;
					setBoard(newBoard);
					setLastMove([x, y]);
					setHistory(prev =&gt; [...prev, { x, y, player: currentPlayer }]);

					const winLine = checkWin(newBoard, x, y, currentPlayer);
					if (winLine) {
						setWinner(currentPlayer);
						setWinningLine(winLine);
						return;
					}

					const isFull = newBoard.every(row =&gt; row.every(cell =&gt; cell !== 0));
					if (isFull) {
						setWinner(-1);
						return;
					}
					setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
				}, [board, currentPlayer, winner, checkWin]);

				const resetGame = useCallback(() =&gt; {
					setBoard(Array(BOARD_SIZE).fill(null).map(() =&gt; Array(BOARD_SIZE).fill(0)));
					setCurrentPlayer(1);
					setWinner(0);
					setWinningLine([]);
					setLastMove(null);
					setHistory([]);
				}, []);

				const undoMove = useCallback(() =&gt; {
					if (history.length &lt; 2) return;
					const newHistory = history.slice(0, -2);
					const newBoard = Array(BOARD_SIZE).fill(null).map(() =&gt; Array(BOARD_SIZE).fill(0));
					newHistory.forEach(({ x, y, player }) =&gt; { newBoard[x][y] = player; });
					setBoard(newBoard);
					setHistory(newHistory);
					setLastMove(newHistory.length &gt; 0 ? [newHistory[newHistory.length - 1].x, newHistory[newHistory.length - 1].y] : null);
					setCurrentPlayer(1);
					setWinner(0);
					setWinningLine([]);
				}, [history]);

				const isWinningStone = useCallback((x, y) =&gt; {
					return winningLine.some(([wx, wy]) =&gt; wx === x &amp;&amp; wy === y);
				}, [winningLine]);

				useEffect(() =&gt; {
					if (currentPlayer === 2 &amp;&amp; !winner) {
						const dispose = timer.timeout(() =&gt; {
							const [x, y] = makeAIMove(board.map(row =&gt; [...row]));
							placeStone(x, y);
						}, 300);
						return dispose;
					}
				}, [currentPlayer, winner, board, makeAIMove, placeStone, timer]);

				const getStatusText = () =&gt; {
					if (winner === 1) return "🎉 你赢了！";
					if (winner === 2) return "😔 AI获胜";
					if (winner === -1) return "🤝 平局";
					return currentPlayer === 1 ? "轮到你（黑棋）" : "AI思考中...";
				};

				const renderGrid = () =&gt; {
					const lines = [];
					for (let i = 0; i &lt; BOARD_SIZE; i++) {
						lines.push(createElement("div", {
							key: "h-" + i,
							className: "gomoku-plugin-grid-line gomoku-plugin-grid-line-h",
							style: { top: i * CELL_SIZE + "%" }
						}));
						lines.push(createElement("div", {
							key: "v-" + i,
							className: "gomoku-plugin-grid-line gomoku-plugin-grid-line-v",
							style: { left: i * CELL_SIZE + "%" }
						}));
					}
					const starPoints = [[3, 3], [3, 11], [7, 7], [11, 3], [11, 11]];
					starPoints.forEach(([x, y], idx) =&gt; {
						lines.push(createElement("div", {
							key: "star-" + idx,
							className: "gomoku-plugin-star",
							style: { left: x * CELL_SIZE + "%", top: y * CELL_SIZE + "%" }
						}));
					});
					return lines;
				};

				const renderStones = () =&gt; {
					const stones = [];
					const stoneSize = CELL_SIZE * 0.85 + "%";
					for (let i = 0; i &lt; BOARD_SIZE; i++) {
						for (let j = 0; j &lt; BOARD_SIZE; j++) {
							if (board[i][j] !== 0) {
								const isW = isWinningStone(i, j);
								const isLast = lastMove &amp;&amp; lastMove[0] === i &amp;&amp; lastMove[1] === j;
								stones.push(createElement("div", {
									key: "stone-" + i + "-" + j,
									className: "gomoku-plugin-stone " + (board[i][j] === 1 ? "gomoku-plugin-stone-black" : "gomoku-plugin-stone-white") + (isW ? " gomoku-plugin-stone-winning" : ""),
									style: {
										left: i * CELL_SIZE + "%",
										top: j * CELL_SIZE + "%",
										width: stoneSize,
										height: stoneSize,
										boxShadow: isLast ? "0 0 0 2px var(--dsw-alias-brand-primary), 0 2px 4px rgba(0,0,0,0.2)" : undefined
									}
								}));
							}
							stones.push(createElement("div", {
								key: "intersect-" + i + "-" + j,
								className: "gomoku-plugin-intersection",
								style: {
									left: i * CELL_SIZE + "%",
									top: j * CELL_SIZE + "%",
									zIndex: board[i][j] === 0 ? 1 : -1
								},
								onClick: () =&gt; currentPlayer === 1 &amp;&amp; placeStone(i, j)
							}));
						}
					}
					return stones;
				};

				return createElement("div", {
					className: "gomoku-plugin-container" + (isMinimized ? " gomoku-plugin-minimized" : "")
				}, [
					createElement("div", { className: "gomoku-plugin-header", key: "header" }, [
						createElement("h3", { className: "gomoku-plugin-title", key: "title" }, "五子棋"),
						createElement("div", { className: "gomoku-plugin-header-right", key: "hr" }, [
							createElement("span", { className: "gomoku-plugin-status", key: "status" }, getStatusText()),
							createElement("button", {
								className: "gomoku-plugin-minimize-btn",
								onClick: () =&gt; setIsMinimized(!isMinimized),
								key: "minbtn",
								title: isMinimized ? "展开" : "最小化"
							}, isMinimized ? "🔼" : "🔽")
						])
					]),
					!isMinimized &amp;&amp; createElement("div", { className: "gomoku-plugin-board-wrapper", key: "bw" }, [
						createElement("div", { className: "gomoku-plugin-board", key: "board" }, [
							...renderGrid(),
							...renderStones()
						]),
						winner !== 0 &amp;&amp; createElement("div", { className: "gomoku-plugin-win-overlay", key: "wo" }, [
							createElement("div", { className: "gomoku-plugin-win-text", key: "wt" },
								winner === 1 ? "恭喜你获胜！" : winner === 2 ? "AI获胜，再来一局？" : "平局！"
							),
							createElement("button", {
								className: "gomoku-plugin-btn gomoku-plugin-win-restart-btn",
								onClick: resetGame,
								key: "wr"
							}, "再来一局")
						])
					]),
					!isMinimized &amp;&amp; createElement("div", { className: "gomoku-plugin-controls", key: "ctrl" }, [
						createElement("button", {
							className: "gomoku-plugin-btn",
							onClick: resetGame,
							key: "rb"
						}, "🔄 重新开始"),
						createElement("button", {
							className: "gomoku-plugin-btn",
							onClick: undoMove,
							disabled: history.length &lt; 2,
							key: "ub"
						}, "↩️ 悔棋")
					])
				]);
			};
		}

		const inject = ["slots", "timer"];

		function apply(ctx) {
			const GomokuGame = createGomokuComponent(ctx.timer);
			ctx.slots.inject("shell.overlay", () =&gt; ctx.slots.register(
				{ name: "shell.overlay", id: "gomoku-plugin-game" },
				() =&gt; createElement(GomokuGame)
			));
		}

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
