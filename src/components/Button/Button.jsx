import style from './button.module.scss';

export function Button({ text, onClick }) {
  return (
    <button className={style.buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
}
