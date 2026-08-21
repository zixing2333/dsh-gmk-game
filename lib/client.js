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
		var useMemo = React.useMemo;
		var createElement = React.createElement;
		var Fragment = React.Fragment;

		// Inject CSS
		const css = `
			.gomoku-plugin-container {
				position: fixed;
				bottom: 20px;
				right: 20px;
				width: 320px;
				background: var(--dsw-alias-bg-overlay);
				backdrop-filter: blur(16px);
				-webkit-backdrop-filter: blur(16px);
				border-radius: 16px;
				border: 1px solid var(--dsw-alias-border-l1);
				box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
				padding: 16px;
				z-index: 9999;
				transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
				opacity: 0.7;
				user-select: none;
			}
			.gomoku-plugin-container:hover {
				opacity: 1;
				transform: translateY(-4px);
				box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
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
				display: flex;
				align-items: center;
				gap: 6px;
			}
			.gomoku-plugin-stats {
				display: flex;
				align-items: center;
				gap: 10px;
			}
			.gomoku-plugin-move-count {
				font-size: 12px;
				color: var(--dsw-alias-label-tertiary);
				background: var(--dsw-alias-bg-layer-2);
				padding: 2px 8px;
				border-radius: 10px;
			}
			.gomoku-plugin-status {
				font-size: 13px;
				color: var(--dsw-alias-label-secondary);
				display: flex;
				align-items: center;
				gap: 4px;
			}
			.gomoku-plugin-thinking-dot {
				width: 6px;
				height: 6px;
				background: var(--dsw-alias-brand-primary);
				border-radius: 50%;
				animation: gomoku-plugin-blink 1s infinite;
			}
			@keyframes gomoku-plugin-blink {
				0%, 100% { opacity: 0.3; }
				50% { opacity: 1; }
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
				background: linear-gradient(135deg, rgba(232, 196, 156, 0.75) 0%, rgba(215, 186, 150, 0.75) 100%);
				border-radius: 10px;
				padding: 12px;
				box-sizing: border-box;
				box-shadow: inset 0 2px 8px rgba(0,0,0,0.08);
			}
			.gomoku-plugin-board {
				position: relative;
				width: 100%;
				height: 100%;
			}
			.gomoku-plugin-grid-line {
				position: absolute;
				background-color: rgba(0, 0, 0, 0.35);
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
				transform: translate(-50%, -50%) scale(0);
				animation: gomoku-plugin-drop 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
				box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
			}
			@keyframes gomoku-plugin-drop {
				to { transform: translate(-50%, -50%) scale(1); }
			}
			.gomoku-plugin-stone-black {
				background: radial-gradient(circle at 35% 30%, #666 0%, #222 40%, #000 100%);
			}
			.gomoku-plugin-stone-white {
				background: radial-gradient(circle at 35% 30%, #ffffff 0%, #f0f0f0 50%, #d5d5d5 100%);
				box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), inset 0 -1px 2px rgba(0,0,0,0.05);
			}
			.gomoku-plugin-stone-preview {
				opacity: 0.4;
				pointer-events: none;
				animation: none;
				transform: translate(-50%, -50%) scale(0.9);
			}
			.gomoku-plugin-stone-winning {
				animation: gomoku-plugin-pulse 1.2s infinite alternate, gomoku-plugin-drop 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
			}
			@keyframes gomoku-plugin-pulse {
				from { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.8), 0 3px 6px rgba(0, 0, 0, 0.25); }
				to { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0), 0 3px 6px rgba(0, 0, 0, 0.25); }
			}
			.gomoku-plugin-intersection {
				position: absolute;
				width: calc(100% / 14);
				height: calc(100% / 14);
				transform: translate(-50%, -50%);
				cursor: pointer;
				border-radius: 50%;
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
				transition: all 0.15s ease;
				font-weight: 500;
			}
			.gomoku-plugin-btn:hover:not(:disabled) {
				background: var(--dsw-alias-brand-primary);
				color: white;
				border-color: var(--dsw-alias-brand-primary);
				transform: translateY(-1px);
			}
			.gomoku-plugin-btn:active:not(:disabled) {
				transform: translateY(0);
			}
			.gomoku-plugin-btn:disabled {
				opacity: 0.4;
				cursor: not-allowed;
			}
			.gomoku-plugin-win-overlay {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(0, 0, 0, 0.4);
				border-radius: 10px;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				gap: 12px;
				color: white;
				font-weight: 600;
				backdrop-filter: blur(3px);
				-webkit-backdrop-filter: blur(3px);
				animation: gomoku-plugin-fadein 0.3s ease;
			}
			@keyframes gomoku-plugin-fadein {
				from { opacity: 0; }
				to { opacity: 1; }
			}
			.gomoku-plugin-win-emoji {
				font-size: 48px;
				animation: gomoku-plugin-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
			}
			@keyframes gomoku-plugin-bounce {
				0% { transform: scale(0); }
				60% { transform: scale(1.2); }
				100% { transform: scale(1); }
			}
			.gomoku-plugin-win-text {
				font-size: 20px;
				text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
			}
			.gomoku-plugin-win-restart-btn {
				max-width: 120px;
				flex: none;
				margin-top: 4px;
			}
			.gomoku-plugin-minimized {
				width: auto;
				padding: 8px 14px;
				opacity: 0.9 !important;
			}
			.gomoku-plugin-minimized .gomoku-plugin-board-wrapper,
			.gomoku-plugin-minimized .gomoku-plugin-status,
			.gomoku-plugin-minimized .gomoku-plugin-stats,
			.gomoku-plugin-minimized .gomoku-plugin-controls {
				display: none;
			}
			.gomoku-plugin-minimize-btn {
				background: none;
				border: none;
				color: var(--dsw-alias-label-secondary);
				cursor: pointer;
				font-size: 14px;
				padding: 0;
				width: 24px;
				height: 24px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 6px;
				transition: all 0.15s ease;
			}
			.gomoku-plugin-minimize-btn:hover {
				background: var(--dsw-alias-bg-layer-2);
				color: var(--dsw-alias-label-primary);
			}
			.gomoku-plugin-star {
				position: absolute;
				width: 7px;
				height: 7px;
				background: rgba(0, 0, 0, 0.5);
				border-radius: 50%;
				transform: translate(-50%, -50%);
			}
			.gomoku-plugin-last-marker {
				position: absolute;
				width: 9px;
				height: 9px;
				border-radius: 50%;
				transform: translate(-50%, -50%);
				pointer-events: none;
				z-index: 4;
				animation: gomoku-plugin-drop 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
			}
			.gomoku-plugin-last-marker-black {
				border: 2px solid rgba(255, 255, 255, 0.9);
			}
			.gomoku-plugin-last-marker-white {
				border: 2px solid rgba(50, 50, 50, 0.9);
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
				const [hoverPos, setHoverPos] = useState(null);
				const [isAIThinking, setIsAIThinking] = useState(false);

				const checkWin = useCallback((board, x, y, player) =&gt; {
					const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
					for (let d = 0; d &lt; directions.length; d++) {
						const dx = directions[d][0], dy = directions[d][1];
						let count = 1;
						const line = [[x, y]];
						for (let i = 1; i &lt; 5; i++) {
							const nx = x + dx * i, ny = y + dy * i;
							if (nx &gt;= 0 &amp;&amp; nx &lt; BOARD_SIZE &amp;&amp; ny &gt;= 0 &amp;&amp; ny &lt; BOARD_SIZE &amp;&amp; board[nx][ny] === player) {
								count++; line.push([nx, ny]);
							} else break;
						}
						for (let i = 1; i &lt; 5; i++) {
							const nx = x - dx * i, ny = y - dy * i;
							if (nx &gt;= 0 &amp;&amp; nx &lt; BOARD_SIZE &amp;&amp; ny &gt;= 0 &amp;&amp; ny &lt; BOARD_SIZE &amp;&amp; board[nx][ny] === player) {
								count++; line.push([nx, ny]);
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
						let count = 0, openEnds = 0;
						for (let i = 1; i &lt; 5; i++) {
							const nx = x + dx * i, ny = y + dy * i;
							if (nx &lt; 0 || nx &gt;= BOARD_SIZE || ny &lt; 0 || ny &gt;= BOARD_SIZE) break;
							if (board[nx][ny] === player) count++;
							else if (board[nx][ny] === 0) { openEnds++; break; }
							else break;
						}
						for (let i = 1; i &lt; 5; i++) {
							const nx = x - dx * i, ny = y - dy * i;
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

					const scorePos = (board, x, y, player) =&gt; {
						if (board[x][y] !== 0) return -1;
						let score = 0;
						const dirs = [[1, 0], [0, 1], [1, 1], [1, -1]];
						for (let d = 0; d &lt; 4; d++) {
							score += getLineScore(board, x, y, dirs[d][0], dirs[d][1], player);
						}
						score += (14 - (Math.abs(x - 7) + Math.abs(y - 7))) * 3;
						return score;
					};

					// 立即获胜
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

					// 阻挡玩家获胜
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

					// 空棋盘下天元
					let hasStones = false;
					for (let i = 0; i &lt; BOARD_SIZE; i++) {
						for (let j = 0; j &lt; BOARD_SIZE; j++) {
							if (currentBoard[i][j] !== 0) { hasStones = true; break; }
						}
						if (hasStones) break;
					}
					if (!hasStones) return [7, 7];

					// 评估所有候选位置
					for (let i = 0; i &lt; BOARD_SIZE; i++) {
						for (let j = 0; j &lt; BOARD_SIZE; j++) {
							if (currentBoard[i][j] === 0) {
								let hasNeighbor = false;
								for (let di = -2; di &lt;= 2; di++) {
									for (let dj = -2; dj &lt;= 2; dj++) {
										const ni = i + di, nj = j + dj;
										if (ni &gt;= 0 &amp;&amp; ni &lt; BOARD_SIZE &amp;&amp; nj &gt;= 0 &amp;&amp; nj &lt; BOARD_SIZE &amp;&amp; currentBoard[ni][nj] !== 0) {
											hasNeighbor = true; break;
										}
									}
									if (hasNeighbor) break;
								}
								if (!hasNeighbor) continue;
								const aiS = scorePos(currentBoard, i, j, 2);
								const plS = scorePos(currentBoard, i, j, 1);
								const total = aiS + plS * 0.92;
								if (total &gt; bestScore) {
									bestScore = total;
									bestMove = [i, j];
								}
							}
						}
					}
					return bestMove || [7, 7];
				}, [checkWin]);

				const placeStone = useCallback((x, y) =&gt; {
					if (winner || board[x][y] !== 0 || currentPlayer !== 1 || isAIThinking) return;
					const newBoard = board.map(row =&gt; [...row]);
					newBoard[x][y] = 1;
					setBoard(newBoard);
					setLastMove([x, y]);
					setHistory(prev =&gt; [...prev, { x, y, player: 1 }]);
					setHoverPos(null);

					const winLine = checkWin(newBoard, x, y, 1);
					if (winLine) { setWinner(1); setWinningLine(winLine); return; }

					const isFull = newBoard.every(row =&gt; row.every(c =&gt; c !== 0));
					if (isFull) { setWinner(-1); return; }
					setCurrentPlayer(2);
				}, [board, currentPlayer, winner, isAIThinking, checkWin]);

				// AI回合
				useEffect(() =&gt; {
					if (currentPlayer === 2 &amp;&amp; !winner) {
						setIsAIThinking(true);
						const delay = 350 + Math.random() * 250;
						const dispose = timer.timeout(() =&gt; {
							const boardCopy = board.map(row =&gt; [...row]);
							const [x, y] = makeAIMove(boardCopy);
							const newBoard = board.map(row =&gt; [...row]);
							newBoard[x][y] = 2;
							setBoard(newBoard);
							setLastMove([x, y]);
							setHistory(prev =&gt; [...prev, { x, y, player: 2 }]);

							const winLine = checkWin(newBoard, x, y, 2);
							if (winLine) { setWinner(2); setWinningLine(winLine); }
							else {
								const isFull = newBoard.every(row =&gt; row.every(c =&gt; c !== 0));
								if (isFull) setWinner(-1);
								else setCurrentPlayer(1);
							}
							setIsAIThinking(false);
						}, delay);
						return dispose;
					}
				}, [currentPlayer, winner, board, makeAIMove, checkWin, timer]);

				const resetGame = useCallback(() =&gt; {
					setBoard(Array(BOARD_SIZE).fill(null).map(() =&gt; Array(BOARD_SIZE).fill(0)));
					setCurrentPlayer(1);
					setWinner(0);
					setWinningLine([]);
					setLastMove(null);
					setHistory([]);
					setHoverPos(null);
					setIsAIThinking(false);
				}, []);

				const undoMove = useCallback(() =&gt; {
					if (history.length &lt; 2 || isAIThinking) return;
					const newHist = history.slice(0, -2);
					const newBoard = Array(BOARD_SIZE).fill(null).map(() =&gt; Array(BOARD_SIZE).fill(0));
					for (let i = 0; i &lt; newHist.length; i++) {
						newBoard[newHist[i].x][newHist[i].y] = newHist[i].player;
					}
					setBoard(newBoard);
					setHistory(newHist);
					setLastMove(newHist.length &gt; 0 ? [newHist[newHist.length - 1].x, newHist[newHist.length - 1].y] : null);
					setCurrentPlayer(1);
					setWinner(0);
					setWinningLine([]);
				}, [history, isAIThinking]);

				const isWinning = useCallback((x, y) =&gt; {
					for (let i = 0; i &lt; winningLine.length; i++) {
						if (winningLine[i][0] === x &amp;&amp; winningLine[i][1] === y) return true;
					}
					return false;
				}, [winningLine]);

				const getStatus = () =&gt; {
					if (winner === 1) return createElement(Fragment, null, "🎉 你赢了！");
					if (winner === 2) return createElement(Fragment, null, "😔 AI获胜");
					if (winner === -1) return createElement(Fragment, null, "🤝 平局");
					if (isAIThinking) return createElement(Fragment, null,
						createElement("span", { className: "gomoku-plugin-thinking-dot" }),
						" AI思考中"
					);
					return "轮到你（黑棋）";
				};

				// 渲染棋盘网格和星位（useMemo缓存）
				const gridLines = useMemo(() =&gt; {
					const lines = [];
					for (let i = 0; i &lt; BOARD_SIZE; i++) {
						lines.push(createElement("div", {
							key: "h" + i,
							className: "gomoku-plugin-grid-line gomoku-plugin-grid-line-h",
							style: { top: (i * CELL_SIZE) + "%" }
						}));
						lines.push(createElement("div", {
							key: "v" + i,
							className: "gomoku-plugin-grid-line gomoku-plugin-grid-line-v",
							style: { left: (i * CELL_SIZE) + "%" }
						}));
					}
					const stars = [[3,3],[3,11],[7,7],[11,3],[11,11]];
					for (let i = 0; i &lt; stars.length; i++) {
						lines.push(createElement("div", {
							key: "s" + i,
							className: "gomoku-plugin-star",
							style: { left: (stars[i][0] * CELL_SIZE) + "%", top: (stars[i][1] * CELL_SIZE) + "%" }
						}));
					}
					return lines;
				}, []);

				// 渲染棋子、悬停预览和交互区域
				const stoneSize = (CELL_SIZE * 0.88) + "%";
				const boardElements = [];
				for (let i = 0; i &lt; BOARD_SIZE; i++) {
					for (let j = 0; j &lt; BOARD_SIZE; j++) {
						const stone = board[i][j];
						if (stone !== 0) {
							const win = isWinning(i, j);
							const isLast = lastMove &amp;&amp; lastMove[0] === i &amp;&amp; lastMove[1] === j;
							const isBlack = stone === 1;
							boardElements.push(createElement("div", {
								key: "st" + i + "_" + j,
								className: "gomoku-plugin-stone " + (isBlack ? "gomoku-plugin-stone-black" : "gomoku-plugin-stone-white") + (win ? " gomoku-plugin-stone-winning" : ""),
								style: {
									left: (i * CELL_SIZE) + "%",
									top: (j * CELL_SIZE) + "%",
									width: stoneSize,
									height: stoneSize,
									zIndex: 2
								}
							}));
							// 最后一步标记（非获胜棋子）
							if (isLast &amp;&amp; !win) {
								boardElements.push(createElement("div", {
									key: "lm" + i + "_" + j,
									className: "gomoku-plugin-last-marker " + (isBlack ? "gomoku-plugin-last-marker-black" : "gomoku-plugin-last-marker-white"),
									style: {
										left: (i * CELL_SIZE) + "%",
										top: (j * CELL_SIZE) + "%"
									}
								}));
							}
						}

						// 悬停预览
						const showPreview = stone === 0 &amp;&amp; currentPlayer === 1 &amp;&amp; !winner &amp;&amp; !isAIThinking &amp;&amp; hoverPos &amp;&amp; hoverPos[0] === i &amp;&amp; hoverPos[1] === j;
						if (showPreview) {
							boardElements.push(createElement("div", {
								key: "pv" + i + "_" + j,
								className: "gomoku-plugin-stone gomoku-plugin-stone-black gomoku-plugin-stone-preview",
								style: {
									left: (i * CELL_SIZE) + "%",
									top: (j * CELL_SIZE) + "%",
									width: stoneSize,
									height: stoneSize,
									zIndex: 1
								}
							}));
						}

						// 点击热区
						boardElements.push(createElement("div", {
							key: "hit" + i + "_" + j,
							className: "gomoku-plugin-intersection",
							style: {
								left: (i * CELL_SIZE) + "%",
								top: (j * CELL_SIZE) + "%",
								zIndex: stone === 0 ? 10 : -1
							},
							onMouseEnter: () =&gt; {
								if (stone === 0 &amp;&amp; currentPlayer === 1 &amp;&amp; !winner &amp;&amp; !isAIThinking) setHoverPos([i, j]);
							},
							onMouseLeave: () =&gt; {
								if (hoverPos &amp;&amp; hoverPos[0] === i &amp;&amp; hoverPos[1] === j) setHoverPos(null);
							},
							onClick: () =&gt; placeStone(i, j)
						}));
					}
				}

				return createElement("div", {
					className: "gomoku-plugin-container" + (isMinimized ? " gomoku-plugin-minimized" : "")
				}, [
					createElement("div", { className: "gomoku-plugin-header", key: "hd" }, [
						createElement("h3", { className: "gomoku-plugin-title", key: "tt" }, "⚫ 五子棋"),
						createElement("div", { className: "gomoku-plugin-header-right", key: "hr" }, [
							createElement("div", { className: "gomoku-plugin-stats", key: "st" }, [
								history.length &gt; 0 &amp;&amp; createElement("span", { className: "gomoku-plugin-move-count", key: "mc" }, history.length + "手"),
								createElement("span", { className: "gomoku-plugin-status", key: "ss" }, getStatus())
							]),
							createElement("button", {
								className: "gomoku-plugin-minimize-btn",
								onClick: () =&gt; setIsMinimized(!isMinimized),
								key: "mb",
								title: isMinimized ? "展开" : "最小化"
							}, isMinimized ? "🔼" : "🔽")
						])
					]),
					!isMinimized &amp;&amp; createElement("div", { className: "gomoku-plugin-board-wrapper", key: "bw" }, [
						createElement("div", {
							className: "gomoku-plugin-board",
							key: "bd",
							onMouseLeave: () =&gt; setHoverPos(null)
						}, [gridLines, boardElements]),
						winner !== 0 &amp;&amp; createElement("div", { className: "gomoku-plugin-win-overlay", key: "wo" }, [
							createElement("div", { className: "gomoku-plugin-win-emoji", key: "we" },
								winner === 1 ? "🎉" : winner === 2 ? "😔" : "🤝"
							),
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
					!isMinimized &amp;&amp; createElement("div", { className: "gomoku-plugin-controls", key: "ct" }, [
						createElement("button", {
							className: "gomoku-plugin-btn",
							onClick: resetGame,
							key: "rb"
						}, "🔄 重新开始"),
						createElement("button", {
							className: "gomoku-plugin-btn",
							onClick: undoMove,
							disabled: history.length &lt; 2 || isAIThinking,
							key: "ub"
						}, "↩️ 悔棋")
					])
				]);
			};
		}

		const inject = ["slots", "timer"];

		function apply(ctx) {
			const GomokuGame = createGomokuComponent(ctx.timer);
			ctx.effect(() =&gt; {
				const dispose = ctx.slots.inject("shell.overlay", () =&gt; ctx.slots.register(
					{ name: "shell.overlay", id: "gomoku-plugin-game" },
					() =&gt; createElement(GomokuGame)
				));
				return dispose;
			});
		}

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
