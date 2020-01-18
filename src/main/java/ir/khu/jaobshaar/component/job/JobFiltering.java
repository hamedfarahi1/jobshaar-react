package ir.khu.jaobshaar.component.job;

import ir.khu.jaobshaar.component.company.CompanyFiltering;
import ir.khu.jaobshaar.entity.model.Company;
import ir.khu.jaobshaar.entity.model.Employer;
import ir.khu.jaobshaar.entity.model.Job;
import ir.khu.jaobshaar.entity.model.Job_;
import ir.khu.jaobshaar.service.criteria.CompanyCriteria;
import ir.khu.jaobshaar.service.criteria.JobCriteria;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Component
public class JobFiltering {
    @PersistenceContext
    private final EntityManager entityManager;
    private final CompanyFiltering companyFiltering;

    public JobFiltering(EntityManager entityManager, CompanyFiltering companyFiltering) {
        this.entityManager = entityManager;
        this.companyFiltering = companyFiltering;
    }

    public List<Job> filter(JobCriteria jobCriteria, Pageable pageable) {

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Job> cq = cb.createQuery(Job.class);
        Root<Job> root = cq.from(Job.class);
        List<Predicate> predicates = new ArrayList<>();

        List<Employer> employers = new ArrayList<>();
        if (jobCriteria.getCompanyName() != null) {
            CompanyCriteria companyCriteria = new CompanyCriteria();
            companyCriteria.setName(jobCriteria.getCompanyName());
            companyCriteria.setCategoryTypeIndex(jobCriteria.getCompanyCategoryTypeIndex());
            companyCriteria.setAddress(jobCriteria.getAddress());
            List<Company> companies = companyFiltering.filter(companyCriteria);
            for (Company company : companies) {
                employers.add(company.getEmployer());
            }
            if (employers.size() != 0)
                predicates.add(cb.in(root.get(Job_.EMPLOYER)).value(employers));
            else
                return new ArrayList<>();
        }
        if (jobCriteria.getCategoryTypeIndex() != null) {
            if (jobCriteria.getCategoryTypeIndex().getIn() != null) {
                predicates.add(getValueIn(cb, root,Job_.CATEGORY_TYPE_INDEX,jobCriteria.getCategoryTypeIndex().getIn()));
            }
            if (jobCriteria.getCategoryTypeIndex().getEquals() != null)
                predicates.add(cb.equal(root.get(Job_.CATEGORY_TYPE_INDEX), jobCriteria.getCategoryTypeIndex().getEquals()));
        }
        if (jobCriteria.getCooperationTypeIndex() != null) {
            if (jobCriteria.getCooperationTypeIndex().getIn() != null)
                predicates.add(getValueIn(cb, root,Job_.COOPERATION_TYPE_INDEX,jobCriteria.getCooperationTypeIndex().getIn()));

            if (jobCriteria.getCooperationTypeIndex().getEquals() != null)
                predicates.add(cb.equal(root.get(Job_.COOPERATION_TYPE_INDEX), jobCriteria.getCooperationTypeIndex().getEquals()));
        }
        if (jobCriteria.getRequiredGenderTypeIndex() != null) {
            if (jobCriteria.getRequiredGenderTypeIndex().getIn() != null)
                predicates.add(getValueIn(cb, root,Job_.REQUIRED_GENDER_TYPE_INDEX,jobCriteria.getRequiredGenderTypeIndex().getIn()));

            if (jobCriteria.getRequiredGenderTypeIndex().getEquals() != null)
                predicates.add(cb.equal(root.get(Job_.REQUIRED_GENDER_TYPE_INDEX), jobCriteria.getRequiredGenderTypeIndex().getEquals()
                ));
        }

		/*if (jobCriteria.getFromDate() != null)
			predicates.add(cb.greaterThanOrEqualTo(root.get(Job_.DATE), jobCriteria.getFromDate()));
		if (jobCriteria.getToDate() != null)
			predicates.add(cb.lessThanOrEqualTo(root.get(Job_.DATE), jobCriteria.getToDate()));
*/
        TypedQuery<Job> typedQuery = entityManager.createQuery(cq.select(root).where(predicates.toArray(new Predicate[predicates.size()])));
        if (pageable.isPaged())
            typedQuery.setFirstResult((int) pageable.getOffset()).setMaxResults(pageable.getPageSize());
        return typedQuery.getResultList();
    }

    private CriteriaBuilder.In<Integer> getValueIn(CriteriaBuilder cb, Root<Job> root, String column, List<Integer> values) {
        CriteriaBuilder.In<Integer> in = cb.in(root.get(column));
        for (Integer value : values) {
            in.value(value);
        }
        return in;
    }
}
