export function checkIsAdmin(user) {
  if (!user) return false;
  const roleData = user.role || user.roles;
  if (!roleData) return false;
  if (Array.isArray(roleData)) {
    return roleData.some(r => typeof r === 'string' && r.toUpperCase().includes('ADMIN'));
  }
  if (typeof roleData === 'string') {
    return roleData.toUpperCase().includes('ADMIN');
  }
  return false;
}

export default checkIsAdmin;
