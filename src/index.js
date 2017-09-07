import {createElement, render} from 'rax';
import modWrap from 'common/modWrap';
import Demo from './mods/demo';
const DemoWrap = modWrap(Demo);

render(<DemoWrap />);
