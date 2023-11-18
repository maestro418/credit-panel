import styled from 'styled-components'

interface ModalInterface {
	show: boolean
	onClose?: Function
	closeOverlay?: boolean
	children?: any
	style?: any
	sm?: boolean
	md?: boolean

	isDefault?: boolean
}

export const Modal = ({ show, onClose, sm, md, closeOverlay = true, children, style, isDefault = false }: ModalInterface) => {
	return <>
		{
			show &&
			<StyledModal>
				<div className="overlay" onClick={() => { closeOverlay && onClose && onClose() }}></div>
				<div className={`modal-container ${!!sm ? 'sm' : ''} ${!!md ? 'md' : ''} ${isDefault ? 'default' : ''}`} style={style}>
					{
						children
					}
				</div>
			</StyledModal>
		}
	</>
}

const StyledModal = styled.div`
	display: flex;
	z-index: 10001;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
	position: absolute;
	width: 30%;
	top: 170px;
	left: 35%;
	-webkit-animation: fadein 0.3s; /* Safari, Chrome and Opera > 12.1 */
	   -moz-animation: fadein 0.3s; /* Firefox < 16 */
		-ms-animation: fadein 0.3s; /* Internet Explorer */
		 -o-animation: fadein 0.3s; /* Opera < 12.1 */
			animation: fadein 0.3s;
	@keyframes fadein {
		from { opacity: 0.4; }
		to   { opacity: 1; }
	}
	.overlay{
		position: fixed;
		background-color: rgba(0, 0, 0, 0.25);
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		opacity: 0.6;
	}
	.modal-container{
		border-radius: 1rem;
		background-color: white;
		color: var(--text);
		padding: 2rem;
		position: absolute;
		max-width: 1000px;
		min-width: 300px;
		margin-left: auto;
		width: 100%;
		z-index: 10002;
		overflow-y: auto;
		max-height: 80vh;
		display: flex;
		flex-direction: column;
		gap: 3em;
		text-align: center;
		select {
			padding: 1em 1em;
			border-radius: 0.5em;
			font-size: 1em;
		}
		button {
			padding: 1em 2em;
			background-color: #212529;
			border-radius: 0.5em;
			color: white;
			border: none;
			&:focus {
				outline: none;
			}
		}
		&.sm {
			width: 400px;
			@media (max-width: 576px) {
				width: 100%;
			}
		}
		&.md {
			width: 570px;
			@media (max-width: 576px) {
				width: 100%;
			}
		}
		&.default {
			> div {
				min-height: 0px;
			}
			padding-bottom: 2em;
		}
		@media (max-width: 992px) {
			width: 70%;
		}
		@media (max-width: 768px) {
			margin: 0 auto;
			width: 90%;
			max-width: 100vw;
			position: fixed;
			max-height: 80vh;
			padding: 1rem 1rem 1rem;
		}
		-webkit-animation: container-animation 0.4s; /* Safari, Chrome and Opera > 12.1 */
	   	-moz-animation: container-animation 0.4s; /* Firefox < 16 */
		-ms-animation: container-animation 0.4s; /* Internet Explorer */
		 -o-animation: container-animation 0.4s; /* Opera < 12.1 */
			animation: container-animation 0.4s;
		@keyframes container-animation {
			from { 
				transform: translateY(-100%);
				opacity: 0;
			}
			to   { 
				opacity: 1;
				transform: translateY(0);
			}
		}
		> div {
			position: relative;
			/* min-height: 50vh; */
			> .bottom {
				position: sticky;
				bottom: 0;
				right: 0;
				left: 0;
				top: auto;
				background-color: var(--light);
				z-index: 10003;
				padding: 1em 0;
			}
		}
	}
	
`