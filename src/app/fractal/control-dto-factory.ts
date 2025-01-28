import { ControlDto, ControlInput } from '@types';
import { v4 } from 'uuid';

interface Props {
  parentId: string;
  indicator: string;
}

interface SelectProps extends Props {
  data: string;
}

export const TextControlDtoFactory = ({ parentId, indicator }: Props): ControlDto => ({
  id: v4(),
  data: '',
  input: ControlInput.Text,
  parentId,
  indicator,
});

export const SelectControlDtoFactory = ({ data, parentId, indicator }: SelectProps): ControlDto => ({
  id: v4(),
  data,
  input: ControlInput.Select,
  parentId,
  indicator,
});

export const OrganizerControlDtoFactory = ({ parentId, indicator }: Props): ControlDto => ({
  id: v4(),
  data: '',
  input: ControlInput.Organizer,
  parentId,
  indicator,
});
