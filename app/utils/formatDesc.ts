export function formatDesc(desc: string) {
    return desc.length > 100 ? `${desc.substring(0, 100)}...` : desc;
}