import type { Participant } from './participant.model';

export type CreateParticipantDto = Omit<Participant, 'id'>;
