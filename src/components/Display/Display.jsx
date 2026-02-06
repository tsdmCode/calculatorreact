import style from './display.module.scss';

export function Display({ numbers }) {
  return <input className={style.displayStyle} value={numbers} disabled readOnly />;
}
