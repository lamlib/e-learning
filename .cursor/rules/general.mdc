---
description: Quy tắc chung cho toàn bộ dự án
globs: []
alwaysApply: true
---

# Các quy tắc chung phát triển dự án fullstack

## Cấu trúc dự án

Dự án được chia thành 3 thư mục chính:
- `fe/` - Frontend (Next.js 16)
- `be/` - Backend (Springboot 3.2)
- `docs/` - Documentation (Markdown, PDF)

## Tài liệu tham khảo

Khi làm việc với dự án này, LUÔN tham khảo các tài liệu trong `docs/`:
- `component-specification.md` - Spec chi tiết cho UI components và pages
- `api-ui-mapping.md` - Mapping giữa API endpoints và UI components
- `api.yaml` - OpenAPI specification (BE-FE Contract)
- `fe-architecture-proposal.md` - Kiến trúc Frontend đề xuất

## QUAN TRỌNG: Documentation là Single Source of Truth

**TRƯỚC KHI implement bất kỳ feature nào:**
1. ĐỌC và ĐỐI CHIẾU với documentation liên quan trong `docs/`
2. Đảm bảo implementation KHỚP với spec trong documentation

**KHI PHÁT HIỆN SAI LỆCH giữa code và documentation:**
1. DỪNG LẠI và thông báo cho user về sự sai lệch
2. HỎI user một trong hai lựa chọn:
   - **Option A:** Update documentation để khớp với thay đổi mới
   - **Option B:** Tuân thủ documentation hiện tại và điều chỉnh code
3. CHỜ user quyết định trước khi tiếp tục

**Ví dụ câu hỏi khi phát hiện sai lệch:**
> "Tôi phát hiện sự khác biệt giữa yêu cầu và documentation:
> - Documentation nói: [X]
> - Yêu cầu hiện tại: [Y]
> 
> Bạn muốn:
> 1. Update documentation để phản ánh thay đổi mới?
> 2. Tuân thủ documentation hiện tại?"

## Language

- **Code & Comments:** Tiếng Anh
- **UI Text & User-facing content:** Tiếng Việt
- **Documentation:** Tiếng Việt hoặc Tiếng Anh tùy context
- **Git commits:** Tiếng Anh

## Code Style

- Indent: 2 spaces
- Quotes: Single quotes cho JavaScript/TypeScript
- Semicolons: Có
- Max line length: 100 characters
- Trailing comma: ES5 compatible

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Variables/Functions | camelCase | `getUserById`, `isLoading` |
| Components/Classes | PascalCase | `CourseCard`, `UserService` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_RETRIES` |
| Files (Components) | PascalCase | `CourseCard.tsx` |
| Files (Others) | kebab-case hoặc camelCase | `auth-service.ts`, `useAuth.ts` |
| CSS Classes | kebab-case | `course-card`, `btn-primary` |
| Database Tables | snake_case | `user_courses`, `lecture_progress` |
| API Endpoints | kebab-case | `/api/courses`, `/api/user-profile` |

## Security Best Practices

- KHÔNG hardcode credentials hoặc secrets
- Sử dụng environment variables cho sensitive data
- Validate tất cả user input
- Sanitize data trước khi render (XSS prevention)
- Sử dụng HTTPS trong production

## Git Workflow

### Branch Naming:
- `feature/` - Tính năng mới (MINOR version bump)
- `bugfix/` or `fix` - Bug fixes (PATCH version bump)
- `hotfix/` - Critical fixes for production (PATCH version bump)
- `refactor/` - Code refactoring (no version bump)
- `docs/` - Documentation changes (no version bump)
- `chore/` - Maintenance tasks (no version bump)

### Team Collaboration Workflow:
**1. Starting a New Feature:**
- Update local main branch
```bash
git checkout main
git pull origin main
```
- Create feature branch
```bash
git checkout -b feature/auth-login
```

- Work on feature, make commits
```bash
git add .
git commit -m "feat(auth): add login feature"
```
**2. Keeping Feature Branch Updated:**
- Regularly sync with main
```bash
git checkout main
git pull origin main\
git checkout feature/auth-login
git merge main #or git rebase main (preferred)
```
**3. Preparing for Pull Request:**
- Ensure all tests pass locally
- Run linter and fix issues
- Write/update tests for new features
- Update documentation if needed
- Squash related commits if necessary
- Push branch to remote

**4. Pull Request Process:**
- Create PR with clear title and description
- Link related issues/tickets
- Request at least 1 reviewer
- Address review comments
- Keep PR focused (one feature/fix per PR)
- Keep PR size resonable (< 400 lines if possible)

**5. Code Review Guidelines:**
- Reviewers should respond within 24 hours
- Be constructive and respectful
- Focus on code quality, not personal preferences
- Approve when: code works, test pass, follows conventions
- Request changes for: bugs, missing tests, style violations

**6. Merging:**
- Use "Squash and merge" for feature branches (clean history)
- Use "Merge commit" for hotfixes (preserve context)
- Delete branch after merge
- Update main branch locally: `git checkout main && git pull`

**7. Hotfix Process:**
- Create hotfix from main
```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug-fix
```

- Fix and commit
```bash
git commit -m "fix(auth): resolve security vulnerability"
```

- Create PR, get urgent review, merge
- Tag release immediately after merge

**8. Conflict Resolution:**
- Always resolve conflicts in your feature branch
- Communicate with team if conflicts are complex
- Test thoroughly after resolving conflicts
- Don't force push to shared branches

**9. Commit Best Practices:**
- Make atomic commits (one logical change per commit)
- Commit often (don't wait until end of day)
- Write clear commit message
- Don't commit broken code (tests should pass)
- Use `git stash` for temporary work

**10. Branch Cleanup:**
- Delete merged branches locally: `git branch -d feature/xxx`
- Delete remote branches: `git push origin --delete feature/xxx`
- Keep main branch clean and up-to-date

### Conventional Commit:
Format: `<type>(<scope>): <description>`

**Structure:**
```text
<type>(<scope>): <description>
[optional body]
[optional footer(s)]
```

**Types (affect Sematic Versioning):**
- `feat`: A new feature (MINOR version bump)
- `fix`: A bug fix (PATH version bump)
- `perf`: A performance improvement (PATH version bump)

**Types (no version bump):**
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `refactor`: Code refactoring without changing functionality
- `test`: Adding or updating tests
- `chore`: Changes build process, dependencies, or tooling
- `ci`: Change to CI configuration files and scripts
- `build`: Change to build system or external dependencies

**Scope (optional):**
- Module, component, or area affected (e.g., `auth`, `user`, `api`, `ui`)

**Breaking Change:**
- Add `!` after type/scope: `feat(api)!: remove deprecated endpoint`
- Or add footer: `BREAKING CHANGE: <description>`
- Breaking changes trigger MAJOR version bump

- Commit message format: `type(scope): description`
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
  - Example: `feat(course): add enrollment feature`

### Sematic Versioning 
Version format: `MAJOR.MINOR.PATH`

- **MAJOR**: Breaking changes (incompatible API changes)
- **MINOR**: New features (backward compatible)
- **PATH**: Bug fixes (backward compatible)

**Version Bump Rules:**
- `feat`: MINOR bump
- `fix`, `perf`: PATH bump
- Breaking changes (`!` or `BREAKING CHANGE`): MAJOR bump
- Other types: No version bump

### CI/CD Pipleline
**Workflow:**
1. **On Push/PR to `main`/`master`:**
- Lint code (ESLint, Prettier)
- Run unit tests
- Run integration tests
- Build application
- Check test coverage (>= 80%)

2. **On Merge to `main`/`master`:**
- Run full test suite (unit + integration + ETE)
- Build and deploy to staging enviroment
- Run smoke tests on staging

3. **On Tag (Release):**
- Build production artifacts
- Deploy to production enviroment
- Create Github/Gitlab release with changelog
- Notify stakeholders

**Branch Protection:**
- `main`/`master` branch requires:
- PR approval (at least 1 reviewer)
- All CI checks must pass
- No force push allowed
- Up-to-date with base branch

**Automated Versioning:**
- Use tools like `standard-version` or `sematic-release` to:
+ Analyze commit messages
+ Bump version automatically (MAJOR.MINOR.PATCH)
+ Generate CHANGELOG.md
+ Create git tags
+ Trigger release workflow

**Deployment Strategy**
- **Staging**: Auto-deploy on merge to `main`
- **Production**: Manual approval required for releases
- **Hotfix**: Fast-track deployment for critical fixes

## Performance Guidelines

- Lazy load components và images khi có thể
- Sử dụng caching appropriately
- Optimize database queries
- Minimize bundle size
- Sử dụng pagination cho large datasets
