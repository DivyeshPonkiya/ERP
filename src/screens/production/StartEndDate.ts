type ProductionWork = {
  id: number;
  work_id: number;
  name: string;
  status: string;
  contact_name: string;
  contact_mobile: string;
  contact_whatsapp: string;
  contact_email: string;
  notes: string;
  finished_at: string | null;
  created_at: string;
  updated_at: string;
};

export function calculateDates(data: ProductionWork[]) {
  if (data?.length === 0) {
    return {startDate: null, completedDate: null};
  }

  const startDate = data?.reduce((min, item) => {
    const createdAt = new Date(item.created_at);
    return createdAt < min ? createdAt : min;
  }, new Date(data[0]?.created_at));

  const hasNullFinished = data?.some(item => item.finished_at === null);

  const completedDate = hasNullFinished
    ? null
    : data?.reduce((max, item) => {
        const finishedAt = new Date(item.finished_at!);
        return finishedAt > max ? finishedAt : max;
      }, new Date(data[0].finished_at!));

  return {
    startDate: startDate ? startDate?.toISOString() : null,
    completedDate: completedDate ? completedDate?.toISOString() : null,
  };
}
