import { State } from './state.utils';

export abstract class EventState extends State<string, string> {
  override async set(event: string): Promise<void> {
    this.signal.set(event);
    this.navigate(event);
  }
}
